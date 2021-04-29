import { api } from "../services/api";
import Link from "next/link";
import styles from "./home.module.scss";

type SenatorDetail = {
  tipo: string;
  fornec: string;
  ano: string;
  mes: string;
  valor: number;
};

type Senators = {
  id: number;
  nomeSenador: string;
  despesas: SenatorDetail[];
};

type HomeProps = {
  allSenator: Senators[];
};

export default function Home({ allSenator }: HomeProps) {
  return (
    <div>
      <section className={styles.allSenator}>
        <h2>Lista de Senadores</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Senador</th>
            </tr>
          </thead>
          <tbody>
            {allSenator.map((senator) => {
              return (
                <tr key={senator.id}>
                  <td>{senator.id}</td>
                  <td>
                    <Link href={`/senator/${senator.id}`}>
                      <a>{senator.nomeSenador}</a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await api.get("senadores");

  const allSenator = data.map((senator) => {
    return {
      id: senator.id,
      nomeSenador: senator.nomeSenador,
    };
  });
  return {
    props: {
      allSenator,
    },
  };
}
