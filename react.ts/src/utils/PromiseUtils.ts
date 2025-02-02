

export const PromiseUtils = {
    allWithLimit: async <T>(tasks: Array<() => Promise<T>>, limit: number): Promise<T[]> => {
        const results: T[] = [];
        const activeTasks: Set<Promise<void>> = new Set<Promise<void>>();

        for (const task of tasks) {
            const asyncTask = (async () => {
                results.push(await task()); // Виконуємо асинхроно завдання
            })().catch(e => {throw new Error(`Task error: ${e}`)}); // Якщо під час виконання завдання виникла помилка
                
            activeTasks.add(asyncTask); // Додаємо цю асинхрону функцію 
            asyncTask.finally(() => activeTasks.delete(asyncTask)); // Після виконання видаляємо таску з Сета.

            if (activeTasks.size >= limit) {
                await Promise.race(activeTasks);
            }
        }

        await Promise.all(activeTasks); // Якщо вже всі проміси були запущені, очікуємо завершення останніх промісів

        return results;
    }
}