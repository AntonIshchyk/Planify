public abstract class BaseAccess<T> where T : IHasId
{
    public static async Task<bool> Exists(Guid id)
    {
        T found = await Get(id);
        if (found is null) return false;
        return true;
    }

    public static async Task<bool> Exists(T data) => await Exists(data.Id);

    public static async Task<T> Get(Guid id)
    {
        List<T> allItems = await LoadAll()!;
        return allItems.FirstOrDefault(x => x.Id == id)!;
    }

    public static async Task<T> Get(T data) => await Get(data.Id);

    public static async Task<List<T>>? LoadAll() => await AccessJson.ReadJson<T>();

    public static async Task<bool> Update(T data)
    {
        List<T> allItems = await LoadAll()!;
        int index = allItems.FindIndex(item => item.Id == data.Id);
        if (index < 0) return false;

        allItems[index] = data;
        AccessJson.WriteJsonList(allItems);
        return true;
    }

    public static async Task AddAll(List<T> data)
    {
        List<T> allItems = await LoadAll()!;
        allItems.AddRange(data);
        AccessJson.WriteJsonList(allItems);
    }

    public static async Task Add(T item) => await AccessJson.WriteJson(item);

    public static async Task<bool> Remove(Guid id)
    {
        List<T> allItems = await LoadAll()!;
        T itemToRemove = allItems.FirstOrDefault(x => x.Id == id)!;
        if (itemToRemove is null) return false;

        allItems.Remove(itemToRemove);
        AccessJson.WriteJsonList(allItems);
        return true;
    }

    public static async Task<bool> Remove(T data) => await Remove(data.Id);
}