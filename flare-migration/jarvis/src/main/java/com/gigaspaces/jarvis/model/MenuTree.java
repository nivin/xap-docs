package com.gigaspaces.jarvis.model;

import com.gigaspaces.jarvis.Config;
import com.gigaspaces.jarvis.Logger;
import java.io.*;
import java.util.*;

public class MenuTree {

    private static final Logger logger = Logger.getInstance();

    private static final String[] SHARED_DIRS = new String[]{
        "product_overview", "faq", "api_documentation", "release_notes", "howto", "videos", "sbp"};

    public static void generateNavbar(Config config) throws IOException {
        config.getTotalFolders().set(0);
        config.getTotalPages().set(0);
        final long startTime = System.currentTimeMillis();
        for (ContentSection section : loadSection(config)) {
            section.generateSidenav(config);
        }
        
        for (VersionContainer section : loadVersions(config)) {
            section.generateSidenav(config);
        }

        long duration = System.currentTimeMillis() - startTime;
        logger.info("Finished generating navbar (duration=" + duration + "ms"
                + ", folders=" + config.getTotalFolders()
                + ", pages=" + config.getTotalPages() + ")");
    }

    public static Collection<ContentSection> loadSection(Config config) {
        Collection<ContentSection> result = new ArrayList<>();
        for (String dir : SHARED_DIRS) {
            result.add(new ContentSection(new File(config.getContentPath(), dir)));
        }
        return result;
    }
    
    public static TreeSet<VersionContainer> loadVersions(Config config) {
        TreeSet<VersionContainer> result = new TreeSet<>();
        File[] files = new File(config.getContentPath(), "xap").listFiles();
        if (files != null) {
            for (File versionDir : files) {
                if (versionDir.isDirectory()) {
                    result.add(new VersionContainer(versionDir));
                }
            }
        }
        return result;
    }
}
