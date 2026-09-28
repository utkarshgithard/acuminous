"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, TrendingUp, Users, Phone, Mail, BookOpen, Filter } from "lucide-react";

interface Enquiry {
  _id: string;
  parentName: string;
  childName: string;
  classApplied: string;
  phone: string;
  email?: string;
  message?: string;
  status: "new" | "contacted" | "enrolled" | "rejected";
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  enrolled: number;
  rejected: number;
}

const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  enrolled: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminPage() {
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headers = { "x-admin-key": apiKey, "Content-Type": "application/json" };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [enqRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/enquiries?${filterStatus ? `status=${filterStatus}&` : ""}page=${page}&limit=15`, { headers }),
        fetch(`${API_URL}/api/admin/stats`, { headers }),
      ]);
      const enqData = await enqRes.json();
      const statsData = await statsRes.json();

      if (enqData.success) {
        setEnquiries(enqData.data);
        setTotalPages(enqData.pagination.pages);
      }
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, filterStatus, page]);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`, { headers: { "x-admin-key": apiKey } });
      if (res.ok) {
        setAuthenticated(true);
        setAuthError("");
      } else {
        setAuthError("Invalid API key. Please try again.");
      }
    } catch {
      setAuthError("Cannot connect to server.");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/api/admin/enquiries/${id}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const filtered = enquiries.filter(
    (e) =>
      e.parentName.toLowerCase().includes(search.toLowerCase()) ||
      e.childName.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search)
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-black text-xl text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">Rhythm Foundation School</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Admin API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter your admin key..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-400 focus:outline-none"
              />
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-[#e76f51] text-white font-bold rounded-xl hover:bg-[#d45f40] transition-colors"
            >
              Login →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-black text-gray-800">Enquiries Dashboard</h1>
            <p className="text-xs text-gray-400">Rhythm Foundation School</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a href="/" className="px-4 py-2 bg-[#e76f51] text-white font-bold rounded-xl text-sm hover:bg-[#d45f40]">
            ← Website
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Total", value: stats.total, icon: <Users className="w-5 h-5" />, color: "text-gray-600 bg-gray-100" },
              { label: "New", value: stats.new, icon: <TrendingUp className="w-5 h-5" />, color: "text-blue-600 bg-blue-100" },
              { label: "Contacted", value: stats.contacted, icon: <Phone className="w-5 h-5" />, color: "text-yellow-600 bg-yellow-100" },
              { label: "Enrolled", value: stats.enrolled, icon: <Mail className="w-5 h-5" />, color: "text-green-600 bg-green-100" },
              { label: "Rejected", value: stats.rejected, icon: <Filter className="w-5 h-5" />, color: "text-red-600 bg-red-100" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
                <div>
                  <div className="text-2xl font-black text-gray-800">{s.value}</div>
                  <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-400 focus:outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none bg-white"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="enrolled">Enrolled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-400">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400">No enquiries found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Date", "Parent", "Child", "Class", "Phone", "Email", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((enq) => (
                    <tr key={enq._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{enq.parentName}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{enq.childName}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{enq.classApplied}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${enq.phone}`} className="text-blue-600 hover:underline whitespace-nowrap">
                          {enq.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{enq.email || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[enq.status]}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={enq.status}
                          onChange={(e) => updateStatus(enq._id, e.target.value)}
                          className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none bg-white"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="enrolled">enrolled</option>
                          <option value="rejected">rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
