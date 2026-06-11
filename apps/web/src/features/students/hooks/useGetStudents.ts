// import { useState } from 'react';
import { getStudents } from '../services/studentApi';

export function useGetStudents() {
  async function getAll() {
    try {
      const result = await getStudents();
      return result;
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  }

  return {
    getAll,
  };
}
