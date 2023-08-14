const api = {
  results: async () => {
    const rawResults = await fetch('https://resultados.gob.ar/backend-difu/scope/data/getScopeData/00000000000000000000000b/1/1', { cache: 'no-cache' });
    const results = rawResults.json();
    return results;
  },
};

export default api;