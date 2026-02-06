import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import SchemeCard from '../components/SchemeCard';
import { schemes } from '../data/schemes';
import '../styles/SchemesPage.css';

function SchemesPage() {
  const { translate } = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Schemes', count: schemes.length },
    { id: 'farmer', name: 'Farmers', count: schemes.filter(s => s.category === 'farmer').length },
    { id: 'student', name: 'Students', count: schemes.filter(s => s.category === 'student').length },
    { id: 'women', name: 'Women', count: schemes.filter(s => s.category === 'women').length },
    { id: 'senior', name: 'Senior Citizens', count: schemes.filter(s => s.category === 'senior').length },
    { id: 'business', name: 'Small Business', count: schemes.filter(s => s.category === 'business').length }
  ];

  const eligibilityFilters = [
    { id: 'income', name: 'Income Based' },
    { id: 'age', name: 'Age Based' },
    { id: 'occupation', name: 'Occupation Based' },
    { id: 'region', name: 'Region Specific' }
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    let filtered = schemes;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }
    
    // Apply search query
    if (query) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query) ||
        scheme.benefits.toLowerCase().includes(query)
      );
    }
    
    setFilteredSchemes(filtered);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    
    let filtered = schemes;
    if (categoryId !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === categoryId);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchQuery) ||
        scheme.description.toLowerCase().includes(searchQuery)
      );
    }
    
    setFilteredSchemes(filtered);
  };

  const getSchemeStats = () => {
    return {
      total: schemes.length,
      farmers: schemes.filter(s => s.category === 'farmer').length,
      students: schemes.filter(s => s.category === 'student').length,
      women: schemes.filter(s => s.category === 'women').length
    };
  };

  const stats = getSchemeStats();

  return (
    <div className="schemes-page">
      <div className="schemes-header">
        <h1>Government Scheme Finder</h1>
        <p>Find government schemes that can help you and your family. Matched to your profile and needs.</p>
      </div>

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
            Filters {showFilters ? '▲' : '▼'}
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <h4>Filter by Eligibility:</h4>
              <div className="filter-options">
                {eligibilityFilters.map(filter => (
                  <button
                    key={filter.id}
                    className="filter-option"
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Confidence Level:</h4>
              <div className="confidence-filter">
                <button className="confidence-btn high">Easy to Apply</button>
                <button className="confidence-btn medium">Medium Complexity</button>
                <button className="confidence-btn low">Needs Help</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className="tab-name">{category.name}</span>
            <span className="tab-count">{category.count}</span>
          </button>
        ))}
      </div>

      <div className="schemes-container">
        <div className="schemes-info">
          <h2>
            {selectedCategory === 'all' ? 'All Schemes' : 
             categories.find(c => c.id === selectedCategory)?.name}
            <span className="schemes-count"> ({filteredSchemes.length})</span>
          </h2>
          <p className="schemes-subtitle">
            Showing schemes matched to your needs. Click any scheme to learn more.
          </p>
        </div>

        {filteredSchemes.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No schemes found</h3>
            <p>Try changing your search query or category filter</p>
            <button 
              className="button button-primary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setFilteredSchemes(schemes);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="schemes-grid">
            {filteredSchemes.map(scheme => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}
      </div>

      <div className="scheme-guide">
        <h2>How to Apply for Schemes</h2>
        <div className="guide-steps">
          <div className="guide-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Check Eligibility</h3>
              <p>Verify age, income, occupation, and document requirements</p>
            </div>
          </div>
          <div className="guide-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Gather Documents</h3>
              <p>Aadhaar, income certificate, bank details, photos, etc.</p>
            </div>
          </div>
          <div className="guide-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Apply Online/Offline</h3>
              <p>Visit official website or local government office</p>
            </div>
          </div>
          <div className="guide-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Track Application</h3>
              <p>Use application ID to check status online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-recommendation">
        <div className="ai-card">
          <div className="ai-header">
            <div className="ai-icon">🤖</div>
            <div className="ai-title">
              <h3>AI Scheme Matcher</h3>
              <p>Based on your profile, we recommend these schemes first:</p>
            </div>
          </div>
          
          <div className="recommended-schemes">
            {schemes
              .filter(s => s.category === 'farmer' || s.category === 'general')
              .slice(0, 3)
              .map(scheme => (
                <div key={scheme.id} className="recommended-scheme">
                  <div className="scheme-badge">{scheme.category}</div>
                  <h4>{scheme.name}</h4>
                  <p className="scheme-benefit">{scheme.benefits.split('.')[0]}</p>
                  <button className="button button-primary small">
                    Check Match
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="important-notes">
        <h2>Important Information</h2>
        <div className="notes-grid">
          <div className="note-card warning">
            <div className="note-icon">⚠️</div>
            <h3>Beware of Fraud</h3>
            <p>Never pay money to apply for schemes. All government schemes are free to apply.</p>
          </div>
          <div className="note-card info">
            <div className="note-icon">📞</div>
            <h3>Need Help?</h3>
            <p>Visit your nearest Common Service Center (CSC) or Panchayat office for assistance.</p>
          </div>
          <div className="note-card success">
            <div className="note-icon">✅</div>
            <h3>Verify Schemes</h3>
            <p>Always verify scheme details on official government websites like myscheme.gov.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchemesPage;