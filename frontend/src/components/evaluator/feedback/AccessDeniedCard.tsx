
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const AccessDeniedCard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You need to be logged in as an evaluator to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => navigate('/login')}>
            Log in as Evaluator
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
