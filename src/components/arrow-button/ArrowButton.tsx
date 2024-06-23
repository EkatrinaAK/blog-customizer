import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	onClick?: () => void;
	isOpen?: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`} >
			<img src={arrow} alt='иконка стрелочки' className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}/>
		</div>
	);
};
