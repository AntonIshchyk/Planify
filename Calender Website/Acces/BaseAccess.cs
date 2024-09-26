public abstract class BaseAccess<T> where T : IHasId
{
    public static async Task<bool> Exists(Guid id)
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        T found = allItems.FirstOrDefault(x => x.Id == id)!;
        if (found is null) return false;
        return true;
    }

    public static async Task<T> Get(Guid id)
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        return allItems.FirstOrDefault(x => x.Id == id)!;
    }

    public static async Task<List<T>>? LoadAll()
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        return allItems;
    }

    public static async Task<bool> Update(T data)
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        int index = allItems.FindIndex(item => item.Id == data.Id);
        if (index < 0) return false;

        allItems[index] = data;
        AccessJson.WriteJsonList(allItems);
        return true;
    }

    public static async Task AddAll(List<T> data)
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        allItems.AddRange(data);
        AccessJson.WriteJsonList(allItems);
    }

    public static async Task Add(T item)
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        allItems.Add(item);
        AccessJson.WriteJsonList(allItems);
    }

    public static async Task<bool> Remove(Guid id)
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        T itemToRemove = allItems.FirstOrDefault(x => x.Id == id)!;
        if (itemToRemove is null) return false;

        allItems.Remove(itemToRemove);
        AccessJson.WriteJsonList(allItems);
        return true;
    }

    public static async Task<bool> Remove(T data)
    {
        List<T> allItems = await AccessJson.ReadJson<T>();
        T itemToRemove = allItems.FirstOrDefault(x => x.Id == data.Id)!;
        if (itemToRemove is null) return false;

        allItems.Remove(itemToRemove);
        AccessJson.WriteJsonList(allItems);
        return true;
    }
}
