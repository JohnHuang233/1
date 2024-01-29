import com.example.lab3.StudentResource;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TestStudentResource {

    private final StudentResource subject = new StudentResource();

    /**
     * all the methods below should return a non-empty string
     */

    @Test
    public void testJSON() {
        assertFalse(subject.json().isEmpty());
    }

    @Test
    public void testXML() {
        assertFalse(subject.xml().isEmpty());
    }

    @Test
    public void testCSV() {
        assertFalse(subject.csv().isEmpty());
    }
}
