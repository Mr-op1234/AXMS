
import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type PrintConfig = {
  colorMode: 'bw' | 'color';
  sides: 'single' | 'double';
  orientation: 'portrait' | 'landscape';
  copies: number;
};

type SettingsSelectorProps = {
  onChange: (config: PrintConfig) => void;
};

const SettingsSelector = ({ onChange }: SettingsSelectorProps) => {
  const [config, setConfig] = useState<PrintConfig>({
    colorMode: 'bw',
    sides: 'single',
    orientation: 'portrait',
    copies: 1
  });

  const handleChange = (field: keyof PrintConfig, value: any) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
    onChange(newConfig);
  };

  // Calculate estimated price
  const getEstimatedPrice = () => {
    let basePrice = 3; // Base price per page in rupees
    
    // Add price for color
    if (config.colorMode === 'color') {
      basePrice += 5;
    }
    
    // Adjust for double-sided (slight discount)
    if (config.sides === 'double') {
      basePrice = basePrice * 1.8; // Instead of 2x for 2 pages
    }
    
    // Multiply by copies
    return (basePrice * config.copies).toFixed(2);
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Mode Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Color Mode</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Black & White is more economical. Color printing has an additional charge.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            defaultValue="bw"
            value={config.colorMode}
            onValueChange={(value) => handleChange('colorMode', value)}
            className="grid grid-cols-2 gap-3"
          >
            <div>
              <RadioGroupItem
                value="bw"
                id="bw"
                className="peer sr-only"
              />
              <Label
                htmlFor="bw"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-xerox-500 [&:has([data-state=checked])]:border-xerox-500 cursor-pointer"
              >
                <div className="mb-2 h-12 w-12 rounded-full bg-gray-900 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">B&W</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Black & White</p>
                  <p className="text-xs text-gray-500 mt-1">₹3 per page</p>
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="color"
                id="color"
                className="peer sr-only"
              />
              <Label
                htmlFor="color"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-xerox-500 [&:has([data-state=checked])]:border-xerox-500 cursor-pointer"
              >
                <div className="mb-2 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">COLOR</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Color</p>
                  <p className="text-xs text-gray-500 mt-1">₹8 per page</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Sides Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Print Sides</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Double-sided printing saves paper and is more economical in the long run.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <RadioGroup
            defaultValue="single"
            value={config.sides}
            onValueChange={(value) => handleChange('sides', value)}
            className="grid grid-cols-2 gap-3"
          >
            <div>
              <RadioGroupItem
                value="single"
                id="single"
                className="peer sr-only"
              />
              <Label
                htmlFor="single"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-xerox-500 [&:has([data-state=checked])]:border-xerox-500 cursor-pointer"
              >
                <div className="mb-2 h-12 w-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                  <div className="w-6 h-8 bg-white border border-gray-300 shadow-sm"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Single-sided</p>
                  <p className="text-xs text-gray-500 mt-1">Standard</p>
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="double"
                id="double"
                className="peer sr-only"
              />
              <Label
                htmlFor="double"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-xerox-500 [&:has([data-state=checked])]:border-xerox-500 cursor-pointer"
              >
                <div className="mb-2 h-12 w-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-6 h-8 bg-white border border-gray-300 shadow-sm"></div>
                    <div className="w-6 h-8 bg-white border border-gray-300 shadow-sm absolute top-0 left-0 transform translate-x-1 translate-y-1"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Double-sided</p>
                  <p className="text-xs text-gray-500 mt-1">Eco-friendly</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Orientation Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Orientation</h3>
          </div>
          <RadioGroup
            defaultValue="portrait"
            value={config.orientation}
            onValueChange={(value) => handleChange('orientation', value)}
            className="grid grid-cols-2 gap-3"
          >
            <div>
              <RadioGroupItem
                value="portrait"
                id="portrait"
                className="peer sr-only"
              />
              <Label
                htmlFor="portrait"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-xerox-500 [&:has([data-state=checked])]:border-xerox-500 cursor-pointer"
              >
                <div className="mb-2 h-12 w-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                  <div className="w-6 h-8 bg-white border border-gray-300 shadow-sm"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Portrait</p>
                  <p className="text-xs text-gray-500 mt-1">Vertical</p>
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="landscape"
                id="landscape"
                className="peer sr-only"
              />
              <Label
                htmlFor="landscape"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-xerox-500 [&:has([data-state=checked])]:border-xerox-500 cursor-pointer"
              >
                <div className="mb-2 h-12 w-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                  <div className="w-8 h-6 bg-white border border-gray-300 shadow-sm"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Landscape</p>
                  <p className="text-xs text-gray-500 mt-1">Horizontal</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Copies Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Number of Copies</h3>
          </div>
          <div className="flex items-center justify-between rounded-xl border-2 border-muted bg-popover p-4">
            <span className="text-sm">Copies</span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => handleChange('copies', Math.max(1, config.copies - 1))}
                disabled={config.copies <= 1}
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{config.copies}</span>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => handleChange('copies', Math.min(10, config.copies + 1))}
                disabled={config.copies >= 10}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Estimate */}
      <Card className="animate-fade-in mt-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Estimated Price</h3>
              <p className="text-sm text-gray-500">Based on your selections</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-xerox-700">₹{getEstimatedPrice()}</p>
              <p className="text-xs text-gray-500">Excluding taxes</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Your configuration:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                {config.colorMode === 'bw' ? 'Black & White' : 'Color'} print
              </li>
              <li className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                {config.sides === 'single' ? 'Single-sided' : 'Double-sided'} printing
              </li>
              <li className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                {config.orientation === 'portrait' ? 'Portrait' : 'Landscape'} orientation
              </li>
              <li className="flex items-center">
                <Check size={16} className="text-green-500 mr-2" />
                {config.copies} {config.copies === 1 ? 'copy' : 'copies'}
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSelector;
