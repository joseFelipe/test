import { render } from "react-dom";
import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "./styles.css";

const cards = [
  "https://scontent.fbnu2-1.fna.fbcdn.net/v/t1.0-9/76176434_3256160181077265_2047202037153660928_o.jpg?_nc_cat=100&_nc_oc=AQnUq9avz2BmEMuvVVWqZceoCygMC1XhhyLzzp1DDi2AVnbHpoqHfWwQbgOKvRdulNr9yMyQJ_jZhA60HGaDxIip&_nc_ht=scontent.fbnu2-1.fna&oh=80476823495534289d4f9e5c1e9e2d16&oe=5E5136E6",
  "https://scontent.fbnu2-1.fna.fbcdn.net/v/t1.0-9/10923477_1037472326279406_6400281135408724448_n.jpg?_nc_cat=107&_nc_oc=AQlRD8eytK1fL865hzAhEGn01cGTAD5kTp2rf0ArYdIQnba3VjA2dw9cPUsKbx340IJlrgM31ThujedLevhGFdaE&_nc_ht=scontent.fbnu2-1.fna&oh=eab8ed79347691c7050a793cdb1875d3&oe=5E4F67BF",
  "https://scontent.fbnu2-1.fna.fbcdn.net/v/t31.0-8/10623911_994640837229222_5240576250639095744_o.jpg?_nc_cat=111&_nc_oc=AQmR-o3GOovnQUilvEAsJOa-IfrVwNBuSHD9_-NSq2RWMwmXa2xZPdCDJ2kVe3PyqAyBq8TClYWu3Rj3ze-d_d1M&_nc_ht=scontent.fbnu2-1.fna&oh=fa40cc6092c33c49f1e7419207ca8168&oe=5E58C95A",
  "https://scontent.fbnu2-1.fna.fbcdn.net/v/t31.0-8/1404583_994641227229183_9041112721068392118_o.jpg?_nc_cat=102&_nc_oc=AQkzRKMgur3dqL8ZZD_kaxV7SORa7E-qUsrFBdphXKE_N4VDoQQFkmXoVUFUtCnaYWgek_FS9tckFoXSZ0r2N6o7&_nc_ht=scontent.fbnu2-1.fna&oh=540c64ac13b84d7382ac0930c83e090e&oe=5E435D6A",
  "https://scontent.fbnu2-1.fna.fbcdn.net/v/t1.0-9/74413573_3270286056331344_2238332892189032448_n.jpg?_nc_cat=101&_nc_oc=AQk2TjNE7grdLCfofPrltXkWeSFefWLnBNhxp7FF5Mp7TJeAd3csJA-RlaDJ7hNDOBWV_sJTpedUGZIdnXFP3gPt&_nc_ht=scontent.fbnu2-1.fna&oh=cb01a71472170ea1b752f2b0f828fee2&oe=5E8B785C",
  "https://scontent.fbnu2-1.fna.fbcdn.net/v/t1.0-9/20476316_1906546269372003_4842979997053533177_n.jpg?_nc_cat=100&_nc_oc=AQmWNfWy4sGDgVaNdpH-BaDTMB42J55u50db8hU6ohHLn6Jn3_BiVEfgPg4R18DaVPa9_VJLKpeMaPLhe_R1l19g&_nc_ht=scontent.fbnu2-1.fna&oh=3df18faa06d1a3d78018a0379c6e06a4&oe=5E45F3AC"
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${cards[i]})`
        }}
      />
    </animated.div>
  ));
}

render(<Deck />, document.getElementById("root"));
