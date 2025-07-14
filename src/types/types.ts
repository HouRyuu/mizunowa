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

export type DialysisDateRange = {
    minDate: Date,
    maxDate: Date,
}

export type DiaRec = {
    sessionId: number,
    sessionDate: Date,
    status: DialysisStatus,
}

/**
 * 透析情報
 */
export type DialysisInfo = {
    sessionId: number,
    // 時間・スケジュール（Date型で扱いやすく）
    // 予約時間
    reservationTime: Date;
    // 来院時間
    arrivedAt?: Date;
    // 透析日付
    sessionDate: Date;
    // 透析開始時間（未開始なら undefined）
    startedAt?: Date;
    // 終了時間
    endAt?: Date;
    weightAfterAt?: Date;
    weightBeforeAt?: Date;
    // 透析予定時間（分）
    expDiaMin: number;
    // ステータス
    // 現在の透析状態
    status: DialysisStatus;
    // 設備・担当
    // 受付カウンター
    counterLocation: string;
    counterName: string;
    // 透析室
    wardName: string;
    // 体重計
    scaleLocation: string;
    scaleName: string;
    // ベッド番号
    bedNumber: string;
    // 担当者情報
    // 担当看護師
    nurseName?: string;
    // 担当医師
    doctorName?: string;
    // 担当技師（臨床工学技士など）
    technicianName?: string;
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
    bps?: BloodPressure[];
    temps?: Temperature[];
}

export type Temperature = {
    measureAt: Date;
    temperature: number;
}

export type BloodPressure = {
    measureAt: Date;
    systolicBp: number;
    diastolicBp: number;
    pulse: number;
}

/**
 * 服薬時間帯
 */
export type MedicationTiming = 'AM' | 'NOON' | 'PM' | 'BED' | 'OTHR';

export type MedicationRecord = {
    itemId: number;
    medicationName: string;
    dosage: string;
    frequency: string;
    timing: MedicationTiming;
    recordId?: number;
    takenDate?: Date;
    takenFlag?: boolean;
};

export type DietRecord = {
    patientId?: number;
    dietDate?: Date;
    meal: string;
    foods: string;
};