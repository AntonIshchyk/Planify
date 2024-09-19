using Newtonsoft.Json;


public static class AccesJson
{
    public async static Task<List<T>> ReadJson<T>()
    {
        string path = $"Data/{typeof(T).Name}s.json";
        StreamReader reader;
        List<T> items = new();

        if (File.Exists(path))
        {
            reader = new(path);
            string content = await reader.ReadToEndAsync();
            items = JsonConvert.DeserializeObject<List<T>>(content)!;
            reader.Close();
            reader.Dispose();
        }
        return items;
    }

    public async static Task WriteJson<T>(T item)
    {
        string path = $"Data/{typeof(T).Name}s.json";
        List<T> items = await ReadJson<T>();
        StreamWriter writer = new(path);

        items.Add(item);
        writer.Write(JsonConvert.SerializeObject(items, formatting: Formatting.Indented));

        writer.Close();
        writer.Dispose();
    }

    public async static Task WriteJsonList<T>(List<T> items)
    {
        string path = $"Data/{typeof(T).Name}s.json";
        StreamWriter writer = new(path);

        foreach (T item in items) await WriteJson(item);

        writer.Close();
        writer.Dispose();
    }
}