import Card from "../ui/Card"
import CardContent from "../ui/CardContent"

export function DataTable({ title, data, type = "contributor" }) {
  return (
    <Card>
      <p className="font-bold mt-2 ml-4 mb-2">{title}</p>
      <CardContent>
        <div className="space-y-3">
          {(data && data.length > 0) ? (
            data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                {type === "contributor" ? (
                  <>
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.email}</div>
                    </div>
                    <div className="text-right font-semibold text-gray-900">{item.count} Answers</div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">By: {item.name}</div>
                    </div>
                    <div className="text-right font-semibold text-gray-900">{item.upvotes} </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No data available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
