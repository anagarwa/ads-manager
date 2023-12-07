package com.admanager;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class GenerateCSV {

    public static void main(String[] args) {
        String[] locations = {"California", "Texas", "Florida", "Hawaii", "Washington"};

        Map<String, List<Map<String, Double>>> coordinates = new HashMap<>();

        // Define coordinates for each location
        coordinates.put("California", generateCoordinates(10));
        coordinates.put("Texas", generateCoordinates(10));
        coordinates.put("Florida", generateCoordinates(10));
        coordinates.put("Hawaii", generateCoordinates(10));
        coordinates.put("Washington", generateCoordinates(10));

        // Write data to CSV
        try (FileWriter csvWriter = new FileWriter("campaign_data.csv")) {
            csvWriter.append("Player Id,Location,Latitude,Longitude,Available slots,Target Age,Target Income,Activity,Gender\n");

            Random random = new Random();
            for (int i = 1; i <= 100; i++) {
                String location = locations[random.nextInt(locations.length)];
                List<Map<String, Double>> locationCoordinates = coordinates.get(location);
                Map<String, Double> selectedCoordinates = locationCoordinates.get(random.nextInt(locationCoordinates.size()));

                csvWriter.append(i + ",");
                csvWriter.append(location + ",");
                csvWriter.append(selectedCoordinates.get("lat") + ",");
                csvWriter.append(selectedCoordinates.get("lng") + ",");
                csvWriter.append(random.nextInt(7) + ",");
                csvWriter.append(getRandomValue(new String[]{"student", "young", "middle age", "old age"}) + ",");
                csvWriter.append(getRandomValue(new String[]{"low", "middle", "high"}) + ",");
                csvWriter.append(getRandomValue(new String[]{"Sports", "Music", "Travel", "Cooking"}) + ",");
                csvWriter.append(getRandomValue(new String[]{"Male", "Female", "Other"}) + "\n");
            }

            csvWriter.flush();
            System.out.println("CSV file generated successfully.");
        } catch (IOException e) {
            System.out.println("Error writing to CSV: " + e.getMessage());
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