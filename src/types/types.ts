/**
 * カレンダー用状態
 */
export type RecordStatus = 'normal' | 'abnormal' | 'active';

/**
 * 透析状態。-1予約済0-受付完了1-前体重測定済2-透析中3-透析完了4-後体重測定済
 */
export type DialysisStatus = -1 | 0 | 1 | 2 | 3 | 4;

/**
 * 透析状態タイプ
 */
export type DiaStatus = {
    // -1予約済
    reserved: DialysisStatus,
    // 0受付完了
    checkedIn: DialysisStatus,
    // 1前体重測定済
    weighedBefore: DialysisStatus,
    // 2透析中
    dialyzing: DialysisStatus,
    // 3透析完了
    dialysisDone: DialysisStatus,
    // 4後体重測定済
    weighedAfter: DialysisStatus
}

/**
 * 透析情報
 */
export type DialysisInfo = {
    // 時間・スケジュール（Date型で扱いやすく）
    // 予約時間
    reservedAt: Date;
    // 来院時間
    arrivedAt?: Date;
    // 透析開始時間（未開始なら undefined）
    startedAt?: Date;
    // 終了時間
    endsAt?: Date;
    // 透析予定時間（分）
    remainingMin: number;
    // ステータス
    // 現在の透析状態
    status: DialysisStatus;
    // 設備・担当
    // 受付カウンター
    reception: string;
    // 透析室
    room: string;
    // 体重計
    scale: string;
    // ベッド番号
    bed: string;
    // 担当者情報
    // 担当看護師
    nurse?: string;
    // 担当医師
    doctor?: string;
    // 担当技師（臨床工学技士など）
    technician?: string;
    // 体重・除水
    // 透析前体重（kg）
    weightBefore?: number;
    // ドライウェイト（kg）
    dryWeight: number;
    // 透析後体重（kg）
    weightAfter?: number;
    // 予定除水量（kg）
    ufTarget: number;
    // 実際除水量（kg）
    ufActual?: number;
}