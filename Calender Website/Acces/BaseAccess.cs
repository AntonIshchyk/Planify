public abstract class BaseAccess<T> where T : IHasId
{
    public static async Task<bool> Exists(Guid id)
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        T found = allItems.FirstOrDefault(x => x.Id == id)!;
        if (found is null) return false;
        return true;
    }

    public static async Task<T> Get(Guid id)
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        return allItems.FirstOrDefault(x => x.Id == id)!;
    }

    public static async Task<List<T>>? LoadAll()
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        return allItems;
    }

    public static async Task Update(T data)
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        int index = allItems.FindIndex(item => item.Id == data.Id);

        if (index >= 0)
        {
            allItems[index] = data;
            AccesJson.WriteJsonList(allItems);
        }
    }

    public static async Task AddAll(List<T> data)
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        allItems.AddRange(data);
        AccesJson.WriteJsonList(allItems);
    }

    public static async Task Add(T item)
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        allItems.Add(item);
        AccesJson.WriteJsonList(allItems);
    }

    public static async Task Remove(Guid id)
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        T itemToRemove = allItems.FirstOrDefault(x => x.Id == id)!;
        if (itemToRemove != null)
        {
            allItems.Remove(itemToRemove);
            AccesJson.WriteJsonList(allItems);
        }
    }

    public static async Task Remove(T data)
    {
        List<T> allItems = await AccesJson.ReadJson<T>();
        T itemToRemove = allItems.FirstOrDefault(x => x.Id == data.Id)!;
        if (itemToRemove != null)
        {
            allItems.Remove(itemToRemove);
            AccesJson.WriteJsonList(allItems);
        }
    }
}
