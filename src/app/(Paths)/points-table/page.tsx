'use client';

import { useIplStore } from '@/stores/iplStore';
import PointsTable from '@/components/PointsTable';
import { calculatePointsTable } from '@/utils/calculatePointsTable';
import { useMemo, useEffect } from 'react';

export default function PointsTablePage() {
  // Get data and fetchData function
  const { data, loading, fetchData } = useIplStore();
  
  // Initialize data if not already loaded
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const pointsTableData = useMemo(() => {
    if (!data?.matches) return [];
    const completed = data.matches.filter(m => new Date() > new Date(new Date(`${m.MatchDate}T${m.MatchTime}:00`).getTime() + 10 * 60 * 1000));
    return calculatePointsTable(completed);
  }, [data]);

  if (loading) return <p className="text-center">Loading Points Table...</p>;
  return <PointsTable data={pointsTableData} />;
}