import React, { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import SchemeCard from "../components/SchemeCard";
import { normalizedSchemes as schemes } from "../data/normalizedScheme";
import SchemeDetailModal from "../components/SchemeDetailModal";

import "../styles/SchemesPage.css";

function SchemesPage() {
  const { translate } = useContext(LanguageContext);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);
  const [showFilters, setShowFilters] = useState(false);
  const [showLiveSearch, setShowLiveSearch] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { id: "all", name: "All Schemes", count: schemes.length },
    { id: "farmer", name: "Farmers", count: schemes.filter(s => s.category === "farmer").length },
    { id: "student", name: "Students", count: schemes.filter(s => s.category === "student").length },
    { id: "women", name: "Women", count: schemes.filter(s => s.category === "women").length },
    { id: "senior", name: "Senior Citizens", count: schemes.filter(s => s.category === "senior").length },
    { id: "business", name: "Small Business", count: schemes.filter(s => s.category === "business").length }
  ];

  const eligibilityFilters = [
    { id: "income", name: "Income Based" },
    { id: "age", name: "Age Based" },
    { id: "occupation", name: "Occupation Based" },
    { id: "region", name: "Region Specific" }
  ];

  const handleSearch = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);

  let filtered = schemes;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(s => s.category === selectedCategory);
  }

  if (query) {
    filtered = filtered.filter(s => {
      const name = s.name?.toLowerCase() || "";
      const desc = s.description?.toLowerCase() || "";
      const benefits = s.benefits?.toLowerCase() || "";

      const eligibility =
        Array.isArray(s.eligibility)
          ? s.eligibility.join(" ").toLowerCase()
          : s.eligibility?.toLowerCase() || "";

      return (
        name.includes(query) ||
        desc.includes(query) ||
        benefits.includes(query) ||
        eligibility.includes(query)
      );
    });
  }

  setFilteredSchemes(filtered);
};



  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    let filtered = schemes;
    if (categoryId !== "all") {
      filtered = filtered.filter(s => s.category === categoryId);
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery) ||
        s.description.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredSchemes(filtered);
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedScheme(null);
  };

  const stats = {
    total: schemes.length,
    farmers: schemes.filter(s => s.category === "farmer").length,
    students: schemes.filter(s => s.category === "student").length,
    women: schemes.filter(s => s.category === "women").length
  };

  return (
    <div className="schemes-page">

      {/* HEADER */}
      <div className="schemes-header">
        <h1>Government Scheme Finder</h1>
        <p>
          Find government schemes that can help you and your family.
          Search locally or explore live official schemes.
        </p>
      </div>

      {/* STATS */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Schemes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.farmers}</div>
          <div className="stat-label">For Farmers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.students}</div>
          <div className="stat-label">For Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.women}</div>
          <div className="stat-label">For Women</div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search schemes by name, benefits, or keywords..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {showFilters ? "▲" : "▼"}
          </button>
        </div>

        <div style={{ marginTop: "12px", textAlign: "right" }}>
          <button
            className="button button-secondary"
            onClick={() => setShowLiveSearch(!showLiveSearch)}
          >
            {showLiveSearch
              ? "Hide Live Government Search"
              : "Search Live Government Schemes"}
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <h4>Filter by Eligibility:</h4>
              <div className="filter-options">
                {eligibilityFilters.map(filter => (
                  <button key={filter.id} className="filter-option">
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CATEGORY TABS */}
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className="tab-name">{category.name}</span>
            <span className="tab-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* LOCAL RESULTS */}
      <div className="schemes-container">
        <div className="schemes-info">
          <h2>
            {selectedCategory === "all"
              ? "All Schemes"
              : categories.find(c => c.id === selectedCategory)?.name}
            <span className="schemes-count"> ({filteredSchemes.length})</span>
          </h2>
        </div>

        {filteredSchemes.length === 0 ? (
          <div className="no-results">
            <h3>No schemes found locally</h3>
            <p>Try Live Government Search below</p>
          </div>
        ) : (
          <div className="schemes-grid">
            {filteredSchemes.map((scheme, index) => (
              <SchemeCard 
                key={`${scheme.id}-${index}`} 
                scheme={scheme}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ LIVE GOVERNMENT SEARCH (NO BILLING) */}
      {showLiveSearch && (
        <div className="live-search-section" style={{ marginTop: "40px" }}>
          <h2>Live Government Scheme Search</h2>
          <p style={{ color: "#555", marginBottom: "12px" }}>
            Real-time official results directly from the Government of India (MyScheme).
          </p>

          <div
            style={{
              width: "100%",
              height: "650px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden"
            }}
          >
            <iframe
              title="Government Scheme Live Search"
              src="https://cse.google.com/cse?cx=1551c4e5da9c94f3e"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}

      {/* IMPORTANT NOTES */}
      <div className="important-notes">
        <h2>Important Information</h2>
        <div className="notes-grid">
          <div className="note-card warning">
            <h3>Beware of Fraud</h3>
            <p>All government schemes are free to apply.</p>
          </div>
          <div className="note-card info">
            <h3>Need Help?</h3>
            <p>Visit CSC or Panchayat office for assistance.</p>
          </div>
          <div className="note-card success">
            <h3>Verify Schemes</h3>
            <p>Always verify on official government websites.</p>
          </div>
        </div>
      </div>

      {/* SCHEME DETAIL MODAL */}
      {showModal && selectedScheme && (
        <SchemeDetailModal scheme={selectedScheme} onClose={closeModal} />
      )}
    </div>
  );
}

export default SchemesPage;