import Button from "../ui/Button"
import thumb from '../images/img_thumbs_up.svg'

export default function VoteButton({ count = 0 ,onUpvote, onDownvote, vote }) {
  
  return (
    <span className="flex items-center border rounded overflow-hidden w-fit text-sm text-gray-700">
      <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 focus:outline-none" onClick={onUpvote} {...vote=1}>
        <img src={thumb} alt="Like" className="w-4 h-4" />
      </Button>
      <span className="px-3 py-1 border-x border-gray-300 bg-white text-sm font-medium">
        {count}
      </span>
      <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 focus:outline-none" onClick={onDownvote} {...vote=-1} >
        <img src={thumb} alt="Dislike" className="rotate-180 w-4 h-4" />
      </Button>
    </span>
  )
}
