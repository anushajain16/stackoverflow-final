import Card from "./Card"
import CardContent from "./CardContent"

const StatCard = ({label,value}) => {
  return (
    <div>
        <Card>
            <CardContent className="p-4 mt-2">
                <div className="text-sm text-global-8 mb-1">{label}</div>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    </div>
  )
}

export default StatCard
