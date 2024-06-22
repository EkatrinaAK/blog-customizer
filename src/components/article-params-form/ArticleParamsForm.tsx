import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import { Separator } from '../separator';
import { useState, useRef, useEffect } from 'react';
import {
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	defaultArticleState,
	OptionType,
} from '../../constants/articleProps';
import { Article } from '../article/Article';
import { Text } from '../text';

export type ArticleStyle = {
	fontSizeOptions: OptionType;
	fontFamilyOptions: OptionType;
	fontColors: OptionType;
	backgroundColors: OptionType;
	contentWidthArr: OptionType;
};

export type ArticleParamsFormProps = {
	onChange: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onChange,
	onReset,
}: ArticleParamsFormProps) => {
	const [size, setSize] = useState(defaultArticleState.fontSizeOption);
	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [color, setColor] = useState(defaultArticleState.fontColor);
	const [background, setBackground] = useState(
		defaultArticleState.backgroundColor
	);
	const [width, setWidth] = useState(defaultArticleState.contentWidth);
	const hendleCandgeSize = (option: OptionType) => {
		setSize(option);
	};
	const handleChangeFont = (option: OptionType) => {
		setFont(option);
	};
	const handleChangeColor = (option: OptionType) => {
		setColor(option);
	};
	const handleChangeBackground = (option: OptionType) => {
		setBackground(option);
	};
	const handleChangeWidth = (option: OptionType) => {
		setWidth(option);
	};

	const sedebarRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleCloseClikc = (e: MouseEvent) => {
			if (
				sedebarRef.current &&
				!sedebarRef.current.contains(e.target as Node)
			) {
				setSidebarOpen(false);
			}
		};
		document.addEventListener('mousedown', handleCloseClikc);
		return () => {
			document.removeEventListener('mousedown', handleCloseClikc);
		};
	}, [isSidebarOpen, sedebarRef]);


	return (
		<>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />

			<aside
				ref={sedebarRef}
				className={styles.container}
				style={{ transform: isSidebarOpen ? 'translate(0)' : '' }}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} align='left' uppercase>
						Задайте параметры
					</Text>
					<div>
						<Select
							selected={font}
							onChange={handleChangeFont}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
					</div>

					<div>
						<RadioGroup
							selected={size}
							name='radio'
							onChange={hendleCandgeSize}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
					</div>

					<div>
						<Select
							selected={color}
							onChange={handleChangeColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>

					<Separator />

					<div>
						<Select
							selected={background}
							onChange={handleChangeBackground}
							options={backgroundColors}
							title='Цвет фона'
						/>
					</div>

					<div>
						<Select
							selected={width}
							onChange={handleChangeWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => alert('клик на кнопку сбросить')}
						/>
						<Button title='Применить' type='submit' onClick={() => ''} />
					</div>
				</form>
			</aside>
		</>
	);
};
