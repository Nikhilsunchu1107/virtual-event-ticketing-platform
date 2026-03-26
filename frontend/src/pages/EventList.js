import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import eventService from '../services/eventService';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('date_asc');
  const [categories, setCategories] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category, dateRange, location, sortBy]);

  useEffect(() => {
    const filters = [];
    if (category) filters.push({ type: 'Category', value: category });
    if (dateRange) filters.push({ type: 'Date', value: dateRange });
    setActiveFilters(filters);
  }, [category, dateRange]);

  const fetchCategories = async () => {
    try {
      const response = await eventService.getCategories();
      setCategories(response.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {
        search,
        category,
        sortBy,
      };
      const response = await eventService.getAllEvents(filters);
      setEvents(response.events);
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setDateRange('');
    setLocation('');
    setSortBy('date_asc');
  };

  const removeFilter = (filterType) => {
    if (filterType === 'Category') setCategory('');
    if (filterType === 'Date') setDateRange('');
  };

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-20">
      <div className="mb-12">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-primary">Explore</p>
        <h1 className="mb-6 text-5xl font-black leading-none text-white md:text-7xl">
          Discover <span className="italic text-primary">Events</span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-400">
          Experience the next generation of digital entertainment. From neon-lit jazz nights to
          futuristic tech summits, find your vibe.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-white/5 bg-surface p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="relative md:col-span-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              search
            </span>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-primary focus:ring-primary"
            >
              <option value="">Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative md:col-span-2">
            <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              calendar_today
            </span>
            <input
              type="text"
              placeholder="Date range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="relative md:col-span-2">
            <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              location_on
            </span>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <button className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:bg-primary/90">
              <span className="material-symbols-outlined text-sm">search</span>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          {activeFilters.length > 0 && (
            <>
              <span className="mr-2 text-sm font-medium text-slate-500">Active filters:</span>
              {activeFilters.map((filter, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white"
                >
                  {filter.value}
                  <button type="button" onClick={() => removeFilter(filter.type)}>
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
              <button
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 underline transition-colors hover:text-white"
              >
                Clear All
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-6 md:justify-end">
          <p className="text-sm font-medium text-slate-400">
            Showing <span className="text-white">{events.length}</span> events
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer border-none bg-transparent p-0 text-sm font-bold text-white focus:ring-0"
            >
              <option value="date_asc" className="bg-surface">
                Newest First
              </option>
              <option value="price_asc" className="bg-surface">
                Price: Low-High
              </option>
              <option value="price_desc" className="bg-surface">
                Price: High-Low
              </option>
              <option value="popularity" className="bg-surface">
                Popularity
              </option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-8 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center gap-4 py-20 text-slate-400">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary"></div>
          <p>Loading events...</p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="rounded-2xl border border-white/5 bg-surface px-6 py-12 text-center">
          <p className="mb-4 text-slate-300">No events found. Try adjusting your filters.</p>
          <button
            onClick={handleReset}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white"
          >
            Reset Filters
          </button>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="mt-20 flex items-center justify-center gap-4">
          <button className="flex size-12 items-center justify-center rounded-xl border border-white/5 bg-surface text-slate-400 transition-all hover:border-primary hover:text-primary">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="flex size-12 items-center justify-center rounded-xl bg-primary font-bold text-white">
            1
          </button>
          <button className="flex size-12 items-center justify-center rounded-xl border border-white/5 bg-surface text-slate-400 transition-all hover:border-primary hover:text-primary">
            2
          </button>
          <button className="flex size-12 items-center justify-center rounded-xl border border-white/5 bg-surface text-slate-400 transition-all hover:border-primary hover:text-primary">
            3
          </button>
          <span className="px-2 font-black text-slate-600">...</span>
          <button className="flex size-12 items-center justify-center rounded-xl border border-white/5 bg-surface text-slate-400 transition-all hover:border-primary hover:text-primary">
            12
          </button>
          <button className="flex size-12 items-center justify-center rounded-xl border border-white/5 bg-surface text-slate-400 transition-all hover:border-primary hover:text-primary">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </main>
  );
};

export default EventList;
