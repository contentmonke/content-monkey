package com.content.monkey.backend.model;

public class BookItem {
    private VolumeInfo volumeInfo;

    // Getter and Setter for volumeInfo
    public VolumeInfo getVolumeInfo() {
        return volumeInfo;
    }

    public void setVolumeInfo(VolumeInfo volumeInfo) {
        this.volumeInfo = volumeInfo;
    }

    @Override
    public String toString() {
        return "BookItem{" +
                "volumeInfo=" + volumeInfo +
                '}';
    }
}
