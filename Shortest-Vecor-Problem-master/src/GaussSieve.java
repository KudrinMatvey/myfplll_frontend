import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class GaussSieve {
    LatticeBaisis basis;
    static Random randomno = new Random();

    GaussSieve(LatticeBaisis basis) {
        this.basis = basis;
    }
    public LatticeBaisis solve() {
        ArrayList<LaticceDot> L = new ArrayList<>();
        ArrayList<LaticceDot> S = new ArrayList<>();

        //        L.add()
        double k =0;
        LaticceDot v;
        while (k<c){
            if(S.size() != 0 ){
                v = S.get(S.size() - 1);
                S.remove(S.size() - 1);
            } else {
                v = sampleGaussian();
            }
            v = gaussReduce(v, L, S);
            if (v.isZero()){
                k++;
            } else {
                L.add(v);
            }

        }
        return null;
    }
    //TODO: FIX
    private LaticceDot sampleGaussian() {
        LaticceDot l;
        ArrayList<Double> arr = new ArrayList<>(basis.getDimension());
        for (int i = 0; i < basis.getDimension(); i++) {
            arr.get()
        }
    }

    private LaticceDot gaussReduce(LaticceDot p, ArrayList<LaticceDot> l, ArrayList<LaticceDot> s) {
        for (LaticceDot v : l) {
            while(v.lessOrEqual(p) && p.minus(v).lessOrEqual(p)){
                p = p.minus(v);
            }
        }

        for (LaticceDot v : l) {
            while(p.lessOrEqual(v) && v.minus(p).lessOrEqual(p)){
                l.remove(v);
                s.add(v.minus(p));
            }
        }
        return p;
    }
}
