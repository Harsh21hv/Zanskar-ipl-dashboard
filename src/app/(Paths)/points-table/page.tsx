'use client';

import { useIplData } from '@/utils/hooks/useIplData';
import PointsTable from '@/components/PointsTable';
import { calculatePointsTable } from '@/utils/calculatePointsTable';
import { useMemo } from 'react';

export default function PointsTablePage() {
  const { data, loading } = useIplData();
  const pointsTableData = useMemo(() => {
    if (!data?.matches) return [];
    const completed = data.matches.filter(m => new Date() > new Date(new Date(`${m.MatchDate}T${m.MatchTime}:00`).getTime() + 10 * 60 * 1000));
    return calculatePointsTable(completed);
  }, [data]);

  if (loading) return <p className="text-center">Loading Points Table...</p>;
  return <PointsTable data={pointsTableData} />;
}