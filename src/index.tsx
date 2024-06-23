import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useMemo } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [style, setStyle] = useState(defaultArticleState);

	const cssStyle = useMemo(
		() =>
			({
				'--font-family': style.fontFamilyOption.value,
				'--font-size': style.fontSizeOption.value,
				'--font-color': style.fontColor.value,
				'--container-width': style.contentWidth.value,
				'--bg-color': style.backgroundColor.value,
			} as CSSProperties),
		[style]
	);

	return (
		<div className={styles.main} style={cssStyle}>
			<ArticleParamsForm
				onChange={(e) => setStyle(e)}
				onDefault={() => setStyle(defaultArticleState)}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
