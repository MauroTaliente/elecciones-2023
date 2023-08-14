'use client'
import { FC } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Elecciones 2023',
    },
  },
};


interface Gprops {
  partidos: {
    code: string;
    name: string;
    codLogo: number;
    votos: number;
    perc: number;
    cargos: number;
    percCarg: number;
  }[];
}

const Graph: FC<Gprops> = ({ partidos }) => {

  const scope = partidos.reduce((pre, cur) => {
    if (cur.perc > 10) {
      return [...pre, cur];
    }
    const otro = pre.find(p => p.code === '999') as Gprops['partidos'][0];
    pre[0] = {
      ...otro,
      votos: otro.votos + cur.votos,
      perc: otro.perc + cur.perc,
      cargos: otro.cargos + cur.cargos,
      percCarg: otro.percCarg + cur.percCarg,
    };
    return pre;
  }, [
      {
        name: 'OTROS',
        code: '999',
        codLogo: 999,
        votos: 0,
        perc: 0,
        cargos: 0,
        percCarg: 0,
      }
    ] as unknown as Gprops['partidos'])
    .sort((a, b) => b.votos - a.votos)
    ;
  const labels = scope.map((p) => p.name);
  const data = scope.map((p) => p.perc);

  return (
    <Doughnut
      datasetIdKey='code'
      data={{
        labels,
        datasets: [{
          label: '% of Votos',
          data,
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      }}
    />
  );
};

export default Graph;
