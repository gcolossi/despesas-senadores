import styles from './styles.module.scss'
import Image from 'next/image'
import ptBR from 'date-fns/locale/pt-BR'
import  format  from 'date-fns/format';

export function Header () {

    const currentDate = format(new Date(), 'EEEEEE,d MMMM', {
        locale: ptBR,
    });


    return (
        <header className={styles.headerContainer}>
            <Image
            width={60}
            height={80}
            objectFit="contain"
            src="/politic.png"
            alt="Político"
            />
            <p> Veja o que o seu politico gastou</p>

            <span>{currentDate}</span>
        </header>
    )
}