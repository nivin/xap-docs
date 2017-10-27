package com.gigaspaces.jarvis.model;

import com.gigaspaces.jarvis.Logger;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeSet;

public class VersionContainer implements Comparable<VersionContainer> {

    private final Logger logger = Logger.getInstance();
    private final File path;
    private final String version;
    private final Double numericVersion;
    private final Collection<File> files = new ArrayList<>();
    
    public static TreeSet<VersionContainer> find(File path) {
        TreeSet<VersionContainer> result = new TreeSet<>();
        File[] files = new File(path, "xap").listFiles();
        if (files != null) {
            for (File versionDir : files) {
                if (versionDir.isDirectory()) {
                    result.add(new VersionContainer(versionDir));
                }
            }
        }
        return result;
    }

    public VersionContainer(File path) {
        this.path = path;
        this.version = path.getName().replace(".", "");
        this.numericVersion = Double.valueOf(path.getName());
        for (File contentDir : path.listFiles()) {
            if (contentDir.isDirectory()) {
                files.add(contentDir);
            }
        }
    }

    @Override
    public int compareTo(VersionContainer o) {
        return this.numericVersion.compareTo(o.numericVersion);
    }

    @Override
    public String toString() {
        return numericVersion.toString();
    }

    public String getVersion() {
        return version;
    }
    
    public File getPath() {
        return path;
    }
    
    public Collection<File> getFiles() {
        return files;
    }
    
    public TreeSet<Page> load(MenuTree menuTree) throws IOException {
        logger.debug("processVersion(" + version + ")");
        Map<String, Page> rootsMap = new HashMap<>();
        for (File folder : files) {
            final Collection<Page> folderRoot = menuTree.loadPages(folder, true);
            if (folderRoot.isEmpty()) {
                logger.warning("No root for " + folder.getName());
            } else if (folderRoot.size() != 1) {
                logger.warning("Ambiguous root for " + folder.getName());
            } else {
                rootsMap.put(folder.getName(), folderRoot.iterator().next());
                logger.debug("Processed " + folder.getName());
            }
        }
        File indexFile = new File(path, "index.markdown");
        if (indexFile.exists()) {
            rootsMap.put("intro", new Page(indexFile, true));
        }
        boolean newStructure = version.equals("122");
        // Relocate java tutorial from root under java dev guide:
        relocate(rootsMap, "xap" + version + "tut", "xap" + version);
        relocate(rootsMap, "tut-java", newStructure ? "started" : "dev-java");
        // Relocate .NET tutorial from root under .NET dev guide:
        relocate(rootsMap, "xap" + version + "nettut", "xap" + version + "net");
        relocate(rootsMap, "tut-dotnet", "dev-dotnet");
        // Relocate security under admin:
        if (newStructure) {
            relocate(rootsMap, "security", "admin");
        }

        // Sort and generate roots:
        return new TreeSet<>(rootsMap.values());
    }
    
    private void relocate(Map<String, Page> rootsMap, String sourceKey, String targetKey) {
        Page source = rootsMap.remove(sourceKey);
        if (source != null) {
            rootsMap.get(targetKey).addChild(source);
        }
    }
}
