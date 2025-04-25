import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const PlusCircle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <g clipPath="url(#PlusCircle_svg__a)">
      <path
        fill="#000"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m3 11h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2"
      />
    </g>
    <defs>
      <clipPath id="PlusCircle_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(PlusCircle)
const Memo = memo(ForwardRef)
export default Memo
