import { ref } from 'vue';

const MIN_HEART_BEAT_INTERVAL = 0.3;

const MIN_BPM_VALUE = 40;
const MAX_BPM_VALUE = 180;

const THRESHOLD = 0.6;

const bpm = ref(0);

export function useBPM() {
  function setBPM(data: number[], time: number[]) {
    if (data.length < 10) return 0;

    const mean = data.reduce((a, b) => a + b, 0) / data.length;

    const signal = data.map(x => x - mean);

    const rms = Math.sqrt(
      signal.reduce((a, b) => a + b * b, 0) / signal.length
    );

    const threshold = THRESHOLD * rms;

    const peaks = [];

    for (let i = 1; i < signal.length - 1; i++) {
      if (
        signal[i] > threshold &&
        signal[i] > signal[i - 1] &&
        signal[i] > signal[i + 1]
      ) {
        const isValid = peaks.length === 0 || time[i] - peaks[peaks.length - 1] > MIN_HEART_BEAT_INTERVAL;

        if (isValid) peaks.push(time[i]);
      }
    }

    if (peaks.length < 2) return 0;

    const intervals = [];
    for (let i = 1; i < peaks.length; i++) {
      intervals.push(peaks[i] - peaks[i - 1]);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

    bpm.value = 60 / avgInterval;

    if (bpm.value < MIN_BPM_VALUE || bpm.value > MAX_BPM_VALUE) bpm.value = 0;

    bpm.value = Math.round(bpm.value);
  }

  return { bpm, setBPM };
}
