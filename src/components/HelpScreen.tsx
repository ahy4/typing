interface Props {
	onBack: () => void;
}

export function HelpScreen({ onBack }: Props) {
	return (
		<div
			style={{
				minHeight: "100vh",
				overflowY: "auto",
				background: "var(--bg)",
				color: "#ccc",
			}}
		>
			<div
				style={{
					maxWidth: "640px",
					margin: "0 auto",
					padding: "40px 24px",
					fontFamily: "'Share Tech Mono', monospace",
				}}
			>
				{/* Header */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: "40px",
						borderBottom: "2px solid #ff00aa",
						paddingBottom: "16px",
						boxShadow: "0 2px 20px #ff00aa44",
					}}
				>
					<div>
						<div
							style={{
								fontFamily: "'Dela Gothic One', sans-serif",
								fontSize: "20px",
								background:
									"linear-gradient(90deg, #ff6eb4, #c084fc, #818cf8, #60a5fa, #c084fc, #ff6eb4)",
								backgroundSize: "200% auto",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
								animation:
									"milkyShimmer 5s linear infinite, milkyGlow 3s ease-in-out infinite",
								letterSpacing: "2px",
							}}
						>
							{"ミルキー★タイピング"}
						</div>
						<div
							style={{
								fontSize: "9px",
								color: "#444",
								letterSpacing: "4px",
								textTransform: "uppercase",
								marginTop: "6px",
								fontFamily: "'Press Start 2P', monospace",
							}}
						>
							HELP & RULES
						</div>
					</div>
					<button
						type="button"
						onClick={onBack}
						style={{
							padding: "8px 16px",
							fontSize: "9px",
							fontFamily: "'Press Start 2P', monospace",
							border: "1px solid #2a0050",
							color: "#555",
							background: "none",
							cursor: "pointer",
							letterSpacing: "1px",
							transition: "all 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = "#00ffff";
							e.currentTarget.style.color = "#00ffff";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = "#2a0050";
							e.currentTarget.style.color = "#555";
						}}
					>
						← 戻る
					</button>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
					{/* How to play */}
					<section>
						<h2
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "9px",
								letterSpacing: "3px",
								color: "#00ffff",
								textShadow: "0 0 8px #00ffff44",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							ゲームの目的
						</h2>
						<div
							style={{
								fontSize: "13px",
								color: "#888",
								lineHeight: 1.8,
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							<p>画面に表示される日本語をローマ字でタイプしよう。</p>
							<p>
								HPが0になるとゲームオーバー。正確に素早くタイプしてできるだけ多くの文章をクリアしよう。
							</p>
						</div>
					</section>

					<div
						style={{
							height: "1px",
							background:
								"linear-gradient(90deg, transparent, #2a0050, transparent)",
						}}
					/>

					{/* HP system */}
					<section>
						<h2
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "9px",
								letterSpacing: "3px",
								color: "#00ff66",
								textShadow: "0 0 8px #00ff6644",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							HP システム
						</h2>
						<div
							style={{
								fontSize: "13px",
								lineHeight: 1.8,
								display: "flex",
								flexDirection: "column",
								gap: "6px",
							}}
						>
							{[
								{
									label: "時間経過",
									labelColor: "#666",
									desc: "毎フレーム少しずつHPが減る",
								},
								{
									label: "ミス",
									labelColor: "#ff8800",
									desc: "HP −5 / コンボリセット",
								},
								{ label: "正解", labelColor: "#00ff66", desc: "HP 微回復" },
								{
									label: "コンボ中",
									labelColor: "#00ffff",
									desc: "HP自然減少が 40% に軽減",
								},
							].map((item) => (
								<div key={item.label} style={{ display: "flex", gap: "16px" }}>
									<span
										style={{
											width: "120px",
											flexShrink: 0,
											color: item.labelColor,
											textShadow: `0 0 6px ${item.labelColor}44`,
										}}
									>
										{item.label}
									</span>
									<span style={{ color: "#666" }}>{item.desc}</span>
								</div>
							))}
							<p
								style={{
									fontSize: "11px",
									color: "#333",
									marginTop: "4px",
								}}
							>
								左バー = 自分のHP{"　"}右バー = ゴーストのHP
							</p>
						</div>
					</section>

					<div
						style={{
							height: "1px",
							background:
								"linear-gradient(90deg, transparent, #2a0050, transparent)",
						}}
					/>

					{/* Ghost system */}
					<section>
						<h2
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "9px",
								letterSpacing: "3px",
								color: "#ff00aa",
								textShadow: "0 0 8px #ff00aa44",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							ゴーストシステム
						</h2>
						<div
							style={{
								fontSize: "13px",
								color: "#888",
								lineHeight: 1.8,
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							<p>
								過去のベストプレイ（最高平均KPS）がゴーストとして表示される。
							</p>
							<p>
								右バーでゴーストのHPを確認できる。中央のゲージで自分とゴーストの文章進捗を比較できる。
							</p>
						</div>
					</section>

					<div
						style={{
							height: "1px",
							background:
								"linear-gradient(90deg, transparent, #2a0050, transparent)",
						}}
					/>

					{/* Romaji rules */}
					<section>
						<h2
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "9px",
								letterSpacing: "3px",
								color: "#ff8800",
								textShadow: "0 0 8px #ff880044",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							ローマ字入力ルール
						</h2>
						<div
							style={{
								fontSize: "13px",
								lineHeight: 1.8,
								display: "flex",
								flexDirection: "column",
								gap: "12px",
							}}
						>
							<div>
								<div
									style={{
										fontSize: "10px",
										color: "#444",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "8px",
										fontFamily: "'Press Start 2P', monospace",
									}}
								>
									特殊な文字
								</div>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: "6px 32px",
										fontSize: "13px",
									}}
								>
									{[
										["ん", "n + 子音、または nn"],
										["っ", "子音を2回 (tt, kk, ss…)"],
										["じゃ", "ja / zya"],
										["ちゃ", "cha / tya"],
										["しゃ", "sha / sya"],
										["ふ", "fu / hu"],
										["づ", "du / dzu"],
										["ぢ", "di / dzi"],
									].map(([kana, romaji]) => (
										<div key={kana} style={{ display: "flex", gap: "12px" }}>
											<span
												style={{
													width: "40px",
													color: "#ffee00",
													textShadow: "0 0 6px #ffee0044",
												}}
											>
												{kana}
											</span>
											<span style={{ color: "#555" }}>{romaji}</span>
										</div>
									))}
								</div>
							</div>
							<p style={{ fontSize: "11px", color: "#333" }}>
								複数のローマ字表記に対応しています。どれを使ってもOK。
							</p>
						</div>
					</section>

					<div
						style={{
							height: "1px",
							background:
								"linear-gradient(90deg, transparent, #2a0050, transparent)",
						}}
					/>

					{/* Shortcuts */}
					<section>
						<h2
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "9px",
								letterSpacing: "3px",
								color: "#00ffff",
								textShadow: "0 0 8px #00ffff44",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							キーボードショートカット
						</h2>
						<div
							style={{
								fontSize: "13px",
								lineHeight: 1.8,
								display: "flex",
								flexDirection: "column",
								gap: "6px",
							}}
						>
							{[
								["ENTER / SPACE", "ゲーム開始（タイトル・結果画面）"],
								["ESC", "ゲーム終了 / 前の画面に戻る"],
								["KB ボタン", "キーボード表示の ON / OFF 切り替え"],
							].map(([key, desc]) => (
								<div key={key} style={{ display: "flex", gap: "16px" }}>
									<span
										style={{
											width: "160px",
											flexShrink: 0,
											color: "#00ffff",
											fontFamily: "'Press Start 2P', monospace",
											fontSize: "9px",
											paddingTop: "3px",
										}}
									>
										{key}
									</span>
									<span style={{ color: "#666" }}>{desc}</span>
								</div>
							))}
						</div>
					</section>

					<div
						style={{
							height: "1px",
							background:
								"linear-gradient(90deg, transparent, #2a0050, transparent)",
						}}
					/>

					{/* Stats */}
					<section>
						<h2
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "9px",
								letterSpacing: "3px",
								color: "#00ffff",
								textShadow: "0 0 8px #00ffff44",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							統計・リプレイ
						</h2>
						<div
							style={{
								fontSize: "13px",
								color: "#888",
								lineHeight: 1.8,
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							<p>
								ゲーム終了後、KPS・正確率・文章数・タイムが表示される。KPSはセッション全体の平均値。
							</p>
							<p>
								「統計」でセッション履歴・キー別エラー率・ヒートマップを確認できる。
							</p>
							<p>
								「リプレイ再生」でリプレイ再生。シークバーで任意の時点に移動できる。
							</p>
						</div>
					</section>
				</div>

				<div style={{ marginTop: "40px", textAlign: "center" }}>
					<button
						type="button"
						onClick={onBack}
						style={{
							padding: "12px 32px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "9px",
							border: "2px solid #00ffff",
							color: "#00ffff",
							background: "none",
							boxShadow: "0 0 12px #00ffff33",
							cursor: "pointer",
							letterSpacing: "2px",
							transition: "all 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "rgba(0,255,255,0.08)";
							e.currentTarget.style.boxShadow = "0 0 20px #00ffff66";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "none";
							e.currentTarget.style.boxShadow = "0 0 12px #00ffff33";
						}}
					>
						タイトルへ戻る
					</button>
				</div>
			</div>
		</div>
	);
}
