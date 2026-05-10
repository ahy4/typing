interface Props {
	onBack: () => void;
}

export function HelpScreen({ onBack }: Props) {
	return (
		<div
			className="min-h-screen overflow-y-auto"
			style={{ background: "#050508", color: "#ccc" }}
		>
			<div className="max-w-2xl mx-auto px-6 py-10 font-mono">
				{/* Header */}
				<div className="flex items-center justify-between mb-10">
					<div>
						<div
							className="text-2xl font-black tracking-[0.2em]"
							style={{ color: "#00ffff", textShadow: "0 0 20px #00ffff88" }}
						>
							{"TYPE//DARK"}
						</div>
						<div className="text-xs text-gray-600 tracking-widest uppercase mt-1">
							HELP &amp; RULES
						</div>
					</div>
					<button
						type="button"
						onClick={onBack}
						className="px-4 py-2 text-sm border rounded transition-all"
						style={{ borderColor: "#333", color: "#888" }}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = "#888";
							e.currentTarget.style.color = "#ccc";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = "#333";
							e.currentTarget.style.color = "#888";
						}}
					>
						← BACK
					</button>
				</div>

				<div className="flex flex-col gap-8">
					{/* How to play */}
					<section>
						<h2
							className="text-xs tracking-widest uppercase mb-3"
							style={{ color: "#00ffff" }}
						>
							ゲームの目的
						</h2>
						<div className="text-sm text-gray-400 leading-relaxed space-y-2">
							<p>画面に表示される日本語をローマ字でタイプしよう。</p>
							<p>
								HPが0になるとゲームオーバー。正確に素早くタイプしてできるだけ多くの文章をクリアしよう。
							</p>
						</div>
					</section>

					<div className="h-px" style={{ background: "#111" }} />

					{/* HP system */}
					<section>
						<h2
							className="text-xs tracking-widest uppercase mb-3"
							style={{ color: "#00ff88" }}
						>
							HP システム
						</h2>
						<div className="text-sm leading-relaxed space-y-2">
							<div className="flex gap-4">
								<span className="w-32 shrink-0 text-gray-600">時間経過</span>
								<span className="text-gray-400">
									毎フレーム少しずつHPが減る
								</span>
							</div>
							<div className="flex gap-4">
								<span className="w-32 shrink-0" style={{ color: "#ffaa00" }}>
									ミス
								</span>
								<span className="text-gray-400">
									HP <span style={{ color: "#ff3333" }}>−5</span> /
									コンボリセット
								</span>
							</div>
							<div className="flex gap-4">
								<span className="w-32 shrink-0 text-green-400">正解</span>
								<span className="text-gray-400">HP 微回復</span>
							</div>
							<div className="flex gap-4">
								<span className="w-32 shrink-0" style={{ color: "#00ffff" }}>
									コンボ中
								</span>
								<span className="text-gray-400">
									HP自然減少が <span className="text-yellow-400">40%</span>{" "}
									に軽減
								</span>
							</div>
							<p className="text-gray-600 text-xs mt-2">
								左バー = 自分のHP 右バー = ゴーストのHP
							</p>
						</div>
					</section>

					<div className="h-px" style={{ background: "#111" }} />

					{/* Ghost system */}
					<section>
						<h2
							className="text-xs tracking-widest uppercase mb-3"
							style={{ color: "#cc44ff" }}
						>
							ゴーストシステム
						</h2>
						<div className="text-sm text-gray-400 leading-relaxed space-y-2">
							<p>
								過去のベストプレイ（最高平均KPS）がゴーストとして表示される。
							</p>
							<p>
								右バーでゴーストのHPを確認できる。中央のゲージで自分とゴーストの文章進捗を比較できる。
							</p>
						</div>
					</section>

					<div className="h-px" style={{ background: "#111" }} />

					{/* Romaji rules */}
					<section>
						<h2
							className="text-xs tracking-widest uppercase mb-3"
							style={{ color: "#ffaa00" }}
						>
							ローマ字入力ルール
						</h2>
						<div className="text-sm leading-relaxed space-y-3">
							<div>
								<div className="text-gray-500 text-xs mb-2 uppercase tracking-wider">
									特殊な文字
								</div>
								<div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
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
										<div key={kana} className="flex gap-3">
											<span className="w-12 text-yellow-400">{kana}</span>
											<span className="text-gray-500">{romaji}</span>
										</div>
									))}
								</div>
							</div>
							<p className="text-gray-600 text-xs">
								複数のローマ字表記に対応しています。どれを使ってもOK。
							</p>
						</div>
					</section>

					<div className="h-px" style={{ background: "#111" }} />

					{/* Shortcuts */}
					<section>
						<h2
							className="text-xs tracking-widest uppercase mb-3"
							style={{ color: "#00ffff" }}
						>
							キーボードショートカット
						</h2>
						<div className="text-sm leading-relaxed space-y-2">
							{[
								["ENTER / SPACE", "ゲーム開始（タイトル・結果画面）"],
								["ESC", "ゲーム終了 / 前の画面に戻る"],
								["KB ボタン", "キーボード表示の ON / OFF 切り替え"],
							].map(([key, desc]) => (
								<div key={key} className="flex gap-4">
									<span className="w-36 shrink-0 text-cyan-400">{key}</span>
									<span className="text-gray-400">{desc}</span>
								</div>
							))}
						</div>
					</section>

					<div className="h-px" style={{ background: "#111" }} />

					{/* Stats */}
					<section>
						<h2
							className="text-xs tracking-widest uppercase mb-3"
							style={{ color: "#00ffff" }}
						>
							統計・リプレイ
						</h2>
						<div className="text-sm text-gray-400 leading-relaxed space-y-2">
							<p>
								ゲーム終了後、KPS・正確率・文章数・タイムが表示される。KPSはセッション全体の平均値。
							</p>
							<p>
								STATISTICS
								でセッション履歴・キー別エラー率・ヒートマップを確認できる。
							</p>
							<p>
								VIEW REPLAY でリプレイ再生。シークバーで任意の時点に移動できる。
							</p>
						</div>
					</section>
				</div>

				<div className="mt-10 text-center">
					<button
						type="button"
						onClick={onBack}
						className="px-8 py-3 font-mono text-sm rounded border transition-all"
						style={{
							borderColor: "#00ffff",
							color: "#00ffff",
							boxShadow: "0 0 12px #00ffff33",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "#00ffff18";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "transparent";
						}}
					>
						BACK TO TITLE
					</button>
				</div>
			</div>
		</div>
	);
}
