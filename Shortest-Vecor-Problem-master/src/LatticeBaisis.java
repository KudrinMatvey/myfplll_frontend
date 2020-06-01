import java.util.ArrayList;

public class LatticeBaisis {
    ArrayList<LaticceDot> vectors;
    LatticeBaisis(ArrayList<LaticceDot> vectors) {
        this.vectors = vectors;
    }

    public int getDimension() {
        return vectors.size();
    }

//    public double getLength() {
//        double length = 0;
//        for (int i = 0; i < getDimension(); i++) {
//            length = length + coeff.get(i) * coeff.get(i);
//        }
//        length = Math.sqrt(length);
//        return length;
//    }
}
