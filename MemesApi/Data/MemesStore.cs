using MemesApi.Models;
namespace MemesApi.Data;

public class MemesStore {
    private static int _nextId = 4;
    public static List<Meme> Memes { get; } = new() {
        new Meme { Id = 1, Title = "Когда код заработал с первого раза",
        Category = "программирование", Rating = 5,
        AddedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },

        new Meme { Id = 2, Title = "Я и дедлайн в 23:59",
        Category = "учёба", Rating = 4,
        AddedAt = new DateTime(2026, 1, 2, 0, 0, 0, DateTimeKind.Utc) },

        new Meme { Id = 3, Title = "Пятница после пар",
        Category = "жизнь", Rating = 5,
        AddedAt = new DateTime(2026, 1, 3, 0, 0, 0, DateTimeKind.Utc) }
    };
    public static int NextId() => _nextId++;
}