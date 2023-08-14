import Image from 'next/image';
import api from './api';

function formatNumber(value: string | number) {
  const number = (typeof value === 'string') ? parseFloat(value) : value;
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
  return new Intl.NumberFormat('es-AR', options).format(number);
}

export default async function Home() {
  const results = await api.results();
  const {
    totalVotos, nulos, blancos, afirmativos,
    partidos,
   } = results as {
      totalVotos: number;
      nulos: number;
      blancos: number;
      afirmativos: number;
      partidos: {
        code: string;
        name: string;
        codLogo: number;
        votos: number;
        perc: number;
        cargos: number;
        percCarg: number;
      }[];
   };

  return (
    <main className="flex flex-col items-center justify-between p-y-24 gap-4">
      <div className="flex flex-row gap-2 flex-wrap">
        <div className="flex flex-col bg-slate-100 p-4 rounded-lg justify-center items-center">
          <label>Blancos</label>
          <h2><b>{formatNumber(blancos)}</b></h2>
        </div>
        <div className="flex flex-col bg-red-100 p-4 rounded-lg justify-center items-center">
          <label>Nulos</label>
          <h2><b>{formatNumber(nulos)}</b></h2>
        </div>
        <div className="flex flex-col bg-green-300 p-4 rounded-lg justify-center items-center">
          <label>Afirmativos</label>
          <h2><b>{formatNumber(afirmativos)}</b></h2>
        </div>
        <div className="flex flex-col bg-slate-300 p-4 rounded-lg justify-center items-center">
          <label>Total Votos</label>
          <h2><b>{formatNumber(totalVotos)}</b></h2>
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        {partidos
          .sort((a, b) => b.votos - a.votos)
          .map((partido) => {
          const {
            code,
            name,
            codLogo,
            votos,
            perc,
            cargos,
            percCarg,
          } = partido;
          const bg = (() => {
            if (code === '135') return 'bg-135';
            if (code === '134') return 'bg-134';
            if (code === '132') return 'bg-132';
            return 'bg-white';
          })();
          
          const src = (() => {
            if (code === '135') return 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo_La_Libertad_Avanza_%28cropped%29.png';
            if (code === '134') return 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Frente_de_Todos_logo.svg';
            if (code === '132') return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Juntos-Por-El-Cambio-Logo.svg/2880px-Juntos-Por-El-Cambio-Logo.svg.png';
            return 'https://www.electoral.gob.ar/nuevo/img/btnPrincipal/icono_1.png';
          })();

          return (
            <div key={code} className="flex py-2 md:p-4 w-full md:w-1/2">
              <div className="flex flex-col bg-slate-300 justify-start items-centerw-full rounded-lg overflow-hidden w-full">
                <header className={`flex flex-row justify-between items-start p-4 gap-2 h-40 ${bg}`}>
                  <h4 className="flex flex-1" >{name}</h4>
                  <div className="bg-white p-2 rounded-md">
                    <Image
                      src={src}
                      width={120}
                      height={120}
                      alt={name}
                    />
                  </div>
                </header>
                <div className="flex flex-col p-4">
                    <div className="flex flex-col md:flex-row justify-stretch items-stretch">
                      <h2 className="w-full md:w-1/2"><b>%: {perc}</b></h2>
                      <h2 className="w-full md:w-1/2">T: {formatNumber(votos)}</h2>
                    </div>
                  {/* <ul>
                    <li className="flex flex-col md:flex-row justify-stretch items-stretch">
                      <h5 className="w-full md:w-1/2"><b>% cargos: {percCarg}</b></h5>
                      <h5 className="w-full md:w-1/2">cargos: {cargos}</h5>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <code>
        <pre>{JSON.stringify(Object.keys(results), null, 4)}</pre>
        <pre>{JSON.stringify(results, null, 4)}</pre>
      </code> */}
    </main>
  )
}
