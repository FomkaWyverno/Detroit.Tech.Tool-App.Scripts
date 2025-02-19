

export const PromiseUtils = {
    allWithLimit: async <T>(tasks: Array<(signal: AbortSignal) => Promise<T>>, limit: number): Promise<T[]> => {
        const results: T[] = [];
        const activeTasks: Set<Promise<void>> = new Set<Promise<void>>();

        const controller = new AbortController();
        const { signal } = controller;

        for (const task of tasks) {
            const asyncTask = (async () => {
                results.push(await task(signal)); // Виконуємо асинхроно завдання
            })().catch(e => {throw new Error(`Task error: ${e}`)}); // Якщо під час виконання завдання виникла помилка
                
            activeTasks.add(asyncTask); // Додаємо цю асинхрону функцію 
            asyncTask.finally(() => activeTasks.delete(asyncTask)); // Після виконання видаляємо таску з Сета.

            if (activeTasks.size >= limit) {
                try {
                    await Promise.race(activeTasks);
                } catch (e) {
                    controller.abort();
                    throw e;
                }
            }
        }

        await Promise.all(activeTasks); // Якщо вже всі проміси були запущені, очікуємо завершення останніх промісів

        return results;
    }
}