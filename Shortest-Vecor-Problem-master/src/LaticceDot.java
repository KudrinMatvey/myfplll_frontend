import java.util.ArrayList;
import java.util.List;

public class LaticceDot {
    ArrayList<Double> coeff;
    LaticceDot(ArrayList<Double> coeff){
        this.coeff = coeff;
    }
    public int getDimension() {
        return coeff.size();
    }

    public double getLength() {
        double length = 0;
        for (int i = 0; i < getDimension(); i++) {
            length = length + coeff.get(i) * coeff.get(i);
        }
        length = Math.sqrt(length);
        return length;
    }

    public LaticceDot plus(LaticceDot ld2) {
        if(getDimension() != ld2.getDimension()) {
            throw new UnsupportedOperationException("Different Dimensions");
        }
        ArrayList<Double> res = new ArrayList<>(getDimension());
        for (int i = 0; i < getDimension() ; i++) {
            res.set(i, coeff.get(i) + ld2.coeff.get(i));
        }
        return new LaticceDot(res);
    }

    public LaticceDot minus(LaticceDot ld2) {
        if(getDimension() != ld2.getDimension()) {
            throw new UnsupportedOperationException("Different Dimensions");
        }
        ArrayList<Double> res = new ArrayList<>(getDimension());
        for (int i = 0; i < getDimension() ; i++) {
            res.set(i, coeff.get(i) - ld2.coeff.get(i));
        }
        return new LaticceDot(res);
    }

    public boolean isZero(){
        for (int i = 0; i < getDimension(); i++) {
            if(coeff.get(i) != 0) return false;
        }
        return true;
    }

    public boolean less(LaticceDot ld2){
        return getLength() < ld2.getLength();
    }

    public boolean lessOrEqual(LaticceDot ld2){
        return getLength() <= ld2.getLength();
    }

}
