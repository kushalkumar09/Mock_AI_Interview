import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import useFetchData from "@/hooks/Apihooks/useApiResponse.jsx"
import ApiEndPoints from "@/constants/endpoint.js"
import { useNavigate } from "react-router"
import { useDebounce } from "@/hooks/OptimisationHooks/useDebounce.jsx"
const pastInterviews = [
  { title: "Frontend Developer", date: "2023-10-01", your: 85, max: 100 },
  { title: "Backend Developer", date: "2023-09-25", your: 90, max: 100 },
  { title: "Fullstack Developer", date: "2023-09-20", your: 88, max: 100 },
  { title: "Data Scientist", date: "2023-09-15", your: 92, max: 100 },
  { title: "DevOps Engineer", date: "2023-09-10", your: 80, max: 100 },
  { title: "Product Manager", date: "2023-09-05", your: 87, max: 100 },
  { title: "UI/UX Designer", date: "2023-09-01", your: 91, max: 100 },];

export function RecentTable() {
  const { endPoint } = ApiEndPoints.GetPreviousInterviews;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data } = useFetchData(endPoint,debouncedSearch);
  const [items, setItems] = useState(pastInterviews);

  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const navigate = useNavigate();

  const viewFeedback = (id) => {
    return () => {
      navigate(`/interview/${id}/feedback`);
    };
  }

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  const startIndex = (page - 1) * pageSize
  const displayed = items.slice(startIndex, startIndex + pageSize)
  const showingStart = total === 0 ? 0 : startIndex + 1
  const showingEnd = Math.min(startIndex + pageSize, total)

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages))
  const pageNumbers = useMemo(() => {
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [page, totalPages])

  useEffect(() => {
    console.log(data)
    if (data && data.data) {
      const formattedData = data.data.map(interview => (
        console.log(interview?.InterviewScore?.userScore),
        {
          title: interview.JobPosition || "N/A",
          interviewId: interview.mockInterviewId,
          date: new Date(interview.updatedAt).toISOString().split('T')[0] || "N/A",
          description: interview.JobDescription || "N/A",
          your: interview?.InterviewScore?.userScore ?? 0,
          max: interview?.InterviewScore?.maxScore ?? 10
        }));
      setItems(formattedData);
    }
  }, [data])

  return (
    <Card className="rounded-3xl border-white/5 bg-card/60 backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-pretty">Previous Interviews</CardTitle>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50"
                size={16}
                aria-hidden
              />
              <Input
                className="w-full rounded-xl border-white/10 bg-white/5 pl-9 text-sm placeholder:text-foreground/50"
                placeholder="Search"
                aria-label="Search previous interviews"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-xs text-foreground hover:bg-white/10"
            >
              Last 30 days
              <ChevronDown size={16} className="ml-1" aria-hidden />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <table className="w-full text-sm min-h-60">
            <thead className="bg-white/5 text-foreground/70">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Interview</th>
                <th className="px-4 py-3 font-medium">Interview Date</th>
                <th className="px-4 py-3 font-medium">Your Score</th>
                <th className="px-4 py-3 font-medium">Max Score</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((row, idx) => (
                <tr key={idx} className="border-t border-white/5 hover:bg-white/5" onClick={viewFeedback(row.interviewId)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-white/10" />
                      <div>
                        <p className="font-medium capitalize">{row.title}</p>
                        <p className="w-64 truncate text-xs text-foreground/60">{row.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.your}</td>
                  <td className="px-4 py-3">{row.max}</td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-sm text-foreground/50">
                    No interviews found.
                  </td>
                </tr>
              )}
            </tbody>
            {/* pagination */}
            <tfoot className="bg-white/5 text-foreground/70">
              <tr>
                <td colSpan="4" className="px-4 py-3">

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/10 bg-white/5 text-xs text-foreground hover:bg-white/10"
                      onClick={() => goTo(1)}
                      disabled={page === 1}
                    >
                      <ChevronsLeft size={16} aria-hidden />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/10 bg-white/5 text-xs text-foreground hover:bg-white/10"
                      onClick={() => goTo(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft size={16} aria-hidden />
                    </Button>
                    {pageNumbers.map((pageNumber) => (
                      <Button
                        key={pageNumber}
                        variant="outline"
                        className={`rounded-xl border-white/10 bg-white/5 text-xs text-foreground hover:bg-white/10 ${pageNumber === page ? "bg-white/10" : ""}`}
                        onClick={() => goTo(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/10 bg-white/5 text-xs text-foreground hover:bg-white/10"
                      onClick={() => goTo(page + 1)}
                      disabled={page === totalPages}
                    >
                      <ChevronRight size={16} aria-hidden />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/10 bg-white/5 text-xs text-foreground hover:bg-white/10"
                      onClick={() => goTo(totalPages)}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight size={16} aria-hidden />
                    </Button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
