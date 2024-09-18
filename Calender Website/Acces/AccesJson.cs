using System.Text.Json;

public static class AccesJson
{
    public async static Task<List<T>> ReadJson<T>()
    {
        string path = $"Data/{typeof(T).Name}.json";
        if (File.Exists(path))
        {
            List<T> Data = JsonSerializer.Deserialize<List<T>>(await File.ReadAllTextAsync(path))!;
            return Data;
        }
        return [];
    }

    public async static Task WriteJson<T>(T item)
    {
        string path = $"Data/{typeof(T).Name}.json";
        if (File.Exists(path))
        {
            List<T> data = await ReadJson<T>();
            data.Add(item);
            JsonSerializer.Serialize(data);
        }
    }

    public async static Task WriteJsonList<T>(List<T> items)
    {
        string path = $"Data/{typeof(T).Name}.json";
        if (File.Exists(path)) foreach (T item in items) await WriteJson(item);
    }
}