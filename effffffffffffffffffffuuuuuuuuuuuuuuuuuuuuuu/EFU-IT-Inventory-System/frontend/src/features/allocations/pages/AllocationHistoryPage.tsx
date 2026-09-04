import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { api, type PageMeta } from "../../../lib/api"
import { formatAssetCode } from "../../../utils/assetCode"

interface AllocationRecord {
  id: string
  assetCode: string
  serialNumber: string
  model: string
  employeeName: string
  department: string | null
  allocationDate: string
  returnedAt: string | null
  status: "ALLOCATED" | "RETURNED"
}

const date = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("en-PK") : "—"

const initialMeta: PageMeta = {
  page: 1,
  limit: 20,
  total: 0,
}

export default function AllocationHistory() {
  const [records, setRecords] = useState<AllocationRecord[]>([])
  const [meta, setMeta] = useState(initialMeta)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: "",
    status: "",
    sort: "allocationDate",
    order: "desc",
  })

  const { page, limit, search, status, sort, order } = filters

  const update = (values: Partial<typeof filters>) =>
    setFilters((f) => ({ ...f, ...values }))

  useEffect(() => {
    const query = new URLSearchParams(
      Object.entries(filters).map(([key, value]) => [key, String(value)]),
    )

    setLoading(true)
    setError("")

    api
      .getPage<AllocationRecord>(`/allocations?${query}`)
      .then(({ data, meta }) => {
        setRecords(data)
        setMeta(meta)
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Unable to load allocations."),
      )
      .finally(() => setLoading(false))
  }, [filters])

  const changeSort = (field: string) =>
    update({
      sort: field,
      order: sort === field && order === "asc" ? "desc" : "asc",
      page: 1,
    })

  const totalPages = Math.max(
    meta.totalPages ?? Math.ceil(meta.total / meta.limit),
    1,
  )

  return (
    <main className="allocation-history">
      <header>
        <div>
          <h1>Allocation History</h1>
          <p>Search and review all current and returned asset allocations.</p>
        </div>
      </header>

      <section className="allocation-toolbar">
        <label className="allocation-search">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => update({ search: e.target.value, page: 1 })}
            placeholder="Search asset, serial number, employee or department"
          />
        </label>

        <select
          aria-label="Filter by allocation status"
          value={status}
          onChange={(e) => update({ status: e.target.value, page: 1 })}
        >
          <option value="">All statuses</option>
          {["ALLOCATED", "RETURNED"].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select
          aria-label="Records per page"
          value={limit}
          onChange={(e) =>
            update({ limit: +e.target.value, page: 1 })
          }
        >
          {[20, 50, 100, 1000].map((value) => (
            <option key={value} value={value}>
              {value === 1000 ? "All records" : `${value} rows`}
            </option>
          ))}
        </select>
      </section>

      {error && (
        <div className="allocation-error" role="alert">
          {error}
        </div>
      )}

      <section className="allocation-table-wrap" aria-busy={loading}>
        <table>
          <thead>
            <tr>
              {[
                ["Asset", "asset"],
                ["Serial Number"],
                ["Employee", "employee"],
                ["Department"],
                ["Allocation Date", "allocationDate"],
                ["Return Date", "returnDate"],
                ["Status"],
              ].map(([label, field]) => (
                <th key={label}>
                  {field ? (
                    <button onClick={() => changeSort(field)}>
                      {label}
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && !records.length &&
              Array.from({ length: 6 }, (_, i) => (
                <tr className="allocation-row-skeleton" key={i}>
                  <td colSpan={7} />
                </tr>
              ))}

            {records.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong>{formatAssetCode(r.assetCode)}</strong>
                  <small>{r.model}</small>
                </td>
                <td>{r.serialNumber}</td>
                <td>{r.employeeName}</td>
                <td>{r.department || "—"}</td>
                <td>{date(r.allocationDate)}</td>
                <td>{date(r.returnedAt)}</td>
                <td>
                  <span
                    className={`status-badge status-badge--${r.status.toLowerCase()}`}
                  >
                    {r.status === "RETURNED" ? "Returned" : "Allocated"}
                  </span>
                </td>
              </tr>
            ))}

            {!loading && !records.length && (
              <tr>
                <td colSpan={7} className="allocation-empty">
                  No allocation records match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <footer className="allocation-pagination">
        <span>{meta.total} records</span>

        <div>
          <button
            disabled={page <= 1}
            onClick={() => update({ page: page - 1 })}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => update({ page: page + 1 })}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </main>
  )
}