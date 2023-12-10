package com.admanager;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class GenerateJSON {

    public static void main(String[] args) {
        String[] locations = {"California", "Texas", "Florida", "Hawaii", "Washington"};

        Map<String, List<Map<String, Double>>> coordinates = new HashMap<>();

        // Define coordinates for each location
        coordinates.put("California", generateCoordinates(10));
        coordinates.put("Texas", generateCoordinates(10));
        coordinates.put("Florida", generateCoordinates(10));
        coordinates.put("Hawaii", generateCoordinates(10));
        coordinates.put("Washington", generateCoordinates(10));

        // Create JSON array for storing records
        List<Map<String, Object>> records = new ArrayList<>();

        Random random = new Random();
        for (int i = 1; i <= 100; i++) {
            String location = locations[random.nextInt(locations.length)];
            List<Map<String, Double>> locationCoordinates = coordinates.get(location);
            Map<String, Double> selectedCoordinates = locationCoordinates.get(random.nextInt(locationCoordinates.size()));

            Map<String, Object> record = new HashMap<>();
            record.put("PlayerId", i);
            record.put("Location", location);
            record.put("Latitude", selectedCoordinates.get("lat"));
            record.put("Longitude", selectedCoordinates.get("lng"));
            record.put("AvailableSlots", random.nextInt(7));
            record.put("TargetAge", getRandomValue(new String[]{"student", "young", "middle age", "old age"}));
            record.put("TargetIncome", getRandomValue(new String[]{"low", "middle", "high"}));
            record.put("Activity", getRandomValue(new String[]{"Sports", "Music", "Travel", "Cooking"}));
            record.put("Gender", getRandomValue(new String[]{"Male", "Female", "Other"}));

            records.add(record);
        }

        // Convert records to JSON and write to file
        try (FileWriter jsonWriter = new FileWriter("campaign_data.json")) {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(records);
            jsonWriter.write(jsonOutput);
            System.out.println("JSON file generated successfully.");
        } catch (IOException e) {
            System.out.println("Error writing to JSON file: " + e.getMessage());
        }
    }

    // Method to generate random coordinates for a location
    private static List<Map<String, Double>> generateCoordinates(int count) {
        List<Map<String, Double>> coordinates = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < count; i++) {
            Map<String, Double> coordinate = new HashMap<>();
            coordinate.put("lat", getRandomCoordinate(random, -90, 90));
            coordinate.put("lng", getRandomCoordinate(random, -180, 180));
            coordinates.add(coordinate);
        }
        return coordinates;
    }

    // Method to generate a random coordinate within the given range
    private static double getRandomCoordinate(Random random, double min, double max) {
        return min + (max - min) * random.nextDouble();
    }

    // Method to get a random value from an array of strings
    private static String getRandomValue(String[] array) {
        Random random = new Random();
        return array[random.nextInt(array.length)];
    }
}
