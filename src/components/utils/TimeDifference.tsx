import { MilestoneType } from '@/components/temp';

export function ToObject(keys: string[], values: boolean[]) {
    const keyValuePairs: MilestoneType = {};
    keys.forEach((key, index) => {
        keyValuePairs[key] = values[index];
    });
    return (keyValuePairs)
}