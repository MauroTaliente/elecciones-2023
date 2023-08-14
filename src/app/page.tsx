
import Image from 'next/image';
import api from './api';
import Graph from './components/Graph';

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

  const partidosOr = partidos.sort((a, b) => b.votos - a.votos);

  return (
    <main className="flex flex-col items-center justify-between p-y-24 gap-4">
      <div className="flex flex-row gap-2 p-4 w-full flex-wrap items-center justify-center">
        <div className="flex flex-1 flex-col bg-slate-100 p-4 rounded-lg justify-center items-center">
          <label>Blancos</label>
          <h2><b>{formatNumber(blancos)}</b></h2>
        </div>
        <div className="flex flex-1 flex-col bg-red-100 p-4 rounded-lg justify-center items-center">
          <label>Nulos</label>
          <h2><b>{formatNumber(nulos)}</b></h2>
        </div>
        <div className="flex flex-1 flex-col bg-green-300 p-4 rounded-lg justify-center items-center">
          <label>Afirmativos</label>
          <h2><b>{formatNumber(afirmativos)}</b></h2>
        </div>
        <div className="flex flex-1 flex-col bg-slate-300 p-4 rounded-lg justify-center items-center">
          <label>Total Votos</label>
          <h2><b>{formatNumber(totalVotos)}</b></h2>
        </div>
      </div>
      <div className="flex px-4 w-full">
        <div className="flex p-4 w-full bg-slate-900 rounded-lg max-h-[640px] justify-center items-center">
          <Graph partidos={partidosOr} />
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        {partidosOr
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
              if (code === '135') return 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Logo_La_Libertad_Avanza.png';
              if (code === '134') return 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Frente_de_Todos_logo.svg';
              if (code === '132') return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Juntos-Por-El-Cambio-Logo.svg/2880px-Juntos-Por-El-Cambio-Logo.svg.png';
              return 'https://www.electoral.gob.ar/nuevo/img/btnPrincipal/icono_1.png';
            })();

            return (
              <div key={code} className="flex py-2 md:p-4 w-full md:w-1/2 lg:w-1/3">
                <div className="flex flex-col bg-slate-300 justify-start items-centerw-full rounded-lg overflow-hidden w-full">
                  <header className={`flex  flex-col sm:flex-row flex-wrap justify-between items-start p-4 gap-2 min-h-40 ${bg}`}>
                    <h5 className="sm:flex sm:flex-1" ><b>{name}</b></h5>
                    <div className="bg-white rounded-md p-4">
                      <div className="w-[120px] h-[80px] relative">
                        <Image
                          fill
                          src={src}
                          alt={name}
                          style={{objectFit: "contain"}}
                        />
                      </div>
                    </div>
                  </header>
                  <div className="flex flex-col p-4">
                    <div className="flex flex-col justify-stretch items-stretch">
                      <h2 className="w-full"><b>%: {perc}</b></h2>
                      <h2 className="w-full">T: {formatNumber(votos)}</h2>
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
