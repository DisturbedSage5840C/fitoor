import Image from "next/image";

/** Where the can's mouth tips over on the art, as a share of its box. */
const SPOUT = { x: 80, y: 22 };
/** How thick the pour is at the rim and how far it falls before it lands,
 *  as shares of the art's width and height, so it scales with the can. */
const STREAM_WIDTH = 30;
const STREAM_DROP = 72;
/** The heap of cola waves (scripts/build-cola-waves.py, 720x354). Its tallest
 *  curl sits 85% of the way across, so that is what goes under the stream. */
const WAVES = { w: 720, h: 354, crestX: 0.85, widthShare: 140 };
/** How far down the waves the stream sinks in before they hide it. */
const WAVES_SINK = 0.35;
const COLA = "#5a230c";

interface SodaPourProps {
  /** The tilt the header gives the can, in degrees. The pour turns back by
   *  the same amount so it falls straight down, not on a slant. */
  tilt?: number;
}

/** Two bangled hands tipping a can of diet cola: a heavy, unbroken pour
 *  that lands in a heap of curling cola waves. */
export function SodaPour({ tilt = 0 }: SodaPourProps) {
  const streamBottom = SPOUT.y + STREAM_DROP;
  // The art is 613x899; the waves' height as a share of the art's height.
  const wavesHeight = (WAVES.widthShare / 100) * (WAVES.h / WAVES.w) * (613 / 899) * 100;
  const wavesTop = streamBottom - wavesHeight * WAVES_SINK;
  const wavesLeft = SPOUT.x - WAVES.crestX * WAVES.widthShare;

  return (
    <div className="relative">
      <Image
        quality={90}
        src="/art/soda-can.webp"
        alt="Two hands stacked with bangles, tipping a can of cola"
        width={613}
        height={899}
        preload
        sizes="240px"
        className="sticker-edge h-auto w-full"
      />
      {/* Level with the page, whatever tilt the header gives the can. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ rotate: `${-tilt}deg`, transformOrigin: `${SPOUT.x}% ${SPOUT.y}%` }}
      >
        <div
          className="cola-pour absolute -translate-x-1/2"
          style={{
            left: `${SPOUT.x}%`,
            top: `${SPOUT.y}%`,
            width: `${STREAM_WIDTH}%`,
            height: `${STREAM_DROP}%`,
          }}
        >
          <div className="cola-stream size-full" />
          {/* The lip where the cola curls over the rim. */}
          <span
            className="cola-lip absolute -top-[3%] left-1/2 block h-[7%] w-[52%] -translate-x-1/2 rounded-[50%_50%_40%_40%]"
            style={{ background: COLA }}
          />
        </div>
        <Image
          src="/art/cola-waves.webp"
          alt=""
          width={WAVES.w}
          height={WAVES.h}
          sizes="(min-width: 1024px) 336px, (min-width: 640px) 247px, 135px"
          className="cola-waves sticker-edge absolute h-auto max-w-none"
          style={{
            left: `${wavesLeft}%`,
            top: `${wavesTop}%`,
            width: `${WAVES.widthShare}%`,
          }}
        />
      </div>
    </div>
  );
}
