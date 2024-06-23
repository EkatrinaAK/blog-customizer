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
	ArticleStateType,
} from '../../constants/articleProps';
import { Text } from '../text';

export type ArticleParamsFormProps = {
	onChange: (changeStyle: ArticleStateType) => void;
	onDefault: () => void;
};

export const ArticleParamsForm = ({
	onChange,
	onDefault,
}: ArticleParamsFormProps) => {
	const [size, setSize] = useState(defaultArticleState.fontSizeOption);
	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [color, setColor] = useState(defaultArticleState.fontColor);
	const [background, setBackground] = useState(
		defaultArticleState.backgroundColor
	);
	const [width, setWidth] = useState(defaultArticleState.contentWidth);

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

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChange({
			fontSizeOption: size,
			fontFamilyOption: font,
			fontColor: color,
			backgroundColor: background,
			contentWidth: width,
		});
		setSidebarOpen (false);
	};

	const onReset = () => {
		setSize(defaultArticleState.fontSizeOption);
		setFont(defaultArticleState.fontFamilyOption);
		setColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setWidth(defaultArticleState.contentWidth);

		onDefault();
		setSidebarOpen (false);
	};

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
			<aside
				ref={sedebarRef}
				className={styles.container}
				style={{ transform: isSidebarOpen ? 'translate(0)' : '' }}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as='h2' size={31} weight={800} align='left' uppercase>
						Задайте параметры
					</Text>
					<div>
						<Select
							selected={font}
							onChange={setFont}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
					</div>

					<div>
						<RadioGroup
							selected={size}
							name='radio'
							onChange={setSize}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
					</div>

					<div>
						<Select
							selected={color}
							onChange={setColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>

					<Separator />

					<div>
						<Select
							selected={background}
							onChange={setBackground}
							options={backgroundColors}
							title='Цвет фона'
						/>
					</div>

					<div>
						<Select
							selected={width}
							onChange={setWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
