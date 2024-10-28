package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.ReviewEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GoodReadsDTO {
    @JsonProperty("Book Id")
    private long bookId;
    @JsonProperty("Title")
    private String title;
    @JsonProperty("Author")
    private String author;
    @JsonProperty("Author l-f")
    private String authorLastnameFirstname;
    @JsonProperty("Additional Authors")
    private List<String> additionalAuthors;
    @JsonProperty("ISBN")
    private String isbn;
    @JsonProperty("ISBN13")
    private String isbn13;
    @JsonProperty("My Rating")
    private float myRating;
    @JsonProperty("Average Rating")
    private float averageRating;
    @JsonProperty("Publisher")
    private String publisher;
    @JsonProperty("Binding")
    private String binding;
    @JsonProperty("Number of Pages")
    private int numberOfPages;
    @JsonProperty("Year Published")
    private int yearPublished;
    @JsonProperty("Original Publication Year")
    private int originalPublicationYear;
    @JsonProperty("Date Read")
    private String dateRead;
    @JsonProperty("Date Added")
    private String dateAdded;
    @JsonProperty("Bookshelves")
    private String bookshelves;
    @JsonProperty("Bookshelves with positions")
    private String bookshelvesWithPositions;
    @JsonProperty("Exclusive Shelf")
    private String readingStatus;
    @JsonProperty("My Review")
    private String myReview;
    @JsonProperty("Spoiler")
    private boolean spoiler;
    @JsonProperty("Private Notes")
    private String privateNotes;
    @JsonProperty("Read Count")
    private int readCount;
    @JsonProperty("Owned Copies")
    private int ownedCopies;

    @Override
    public String toString() {
        return "GoodReadsDTO{" +
                "bookId=" + bookId +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", authorLastnameFirstname='" + authorLastnameFirstname + '\'' +
                ", additionalAuthors=" + additionalAuthors +
                ", isbn=" + isbn +
                ", isbn13=" + isbn13 +
                ", myRating=" + myRating +
                ", averageRating=" + averageRating +
                ", publisher='" + publisher + '\'' +
                ", binding='" + binding + '\'' +
                ", numberOfPages=" + numberOfPages +
                ", yearPublished=" + yearPublished +
                ", originalPublicationYear=" + originalPublicationYear +
                ", dateRead=" + dateRead +
                ", dateAdded=" + dateAdded +
                ", bookshelves='" + bookshelves + '\'' +
                ", bookshelvesWithPositions='" + bookshelvesWithPositions + '\'' +
                ", readingStatus='" + readingStatus + '\'' +
                ", myReview='" + myReview + '\'' +
                ", spoiler=" + spoiler +
                ", privateNotes='" + privateNotes + '\'' +
                ", readCount=" + readCount +
                ", ownedCopies=" + ownedCopies +
                '}';
    }
}
