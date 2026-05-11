interface Props {
	text: string;
}

export function InfoTip({ text }: Props) {
	return (
		<span className="info-tip" tabIndex={0} aria-label={text}>
			<span className="info-tip-icon">ⓘ</span>
			<span className="info-tip-bubble" role="tooltip">
				{text}
			</span>
		</span>
	);
}
