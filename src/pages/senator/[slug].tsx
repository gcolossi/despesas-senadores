import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";

type SenatorDetail = {
  id: number;
  tipo: string;
  fornec: string;
  ano: string;
  mes: string;
  valor: number;
};

type Senators = {
  id: string;
  nomeSenador: string;
  despesas: SenatorDetail[];
};

type SenatorProps = {
  senators: Senators;
};

export default function SenatorDetail({ senators }: SenatorProps) {
  return (
    <>
      <div>{senators.nomeSenador}</div>
      {senators.despesas.map((despesa) => {
        return {
            
          tipo: despesa.tipo,
          fornec: despesa.fornec,
        };
      })}
      ;<div>{senators.despesas}</div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("despesasSenadores/1");

  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/despesasSenadores/${slug}`);

  const senators = {
    id: data.id,
    nomeSenador: data.nomeSenador,
    despesas: data.despesas,
  };

  return {
    props: {
      senators,
    },
    revalidate: 60 * 60 * 24,
  };
};
